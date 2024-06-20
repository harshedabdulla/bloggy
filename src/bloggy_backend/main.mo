import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";

actor bloggy {
  type Post = {
    id: Nat;
    title: Text;
    description: Text;
    upvotes: Nat;
    downvotes: Nat;
    author: Principal;
    isPublic: Bool;
  };
  
  type Result<A, B> = Result.Result<A, B>;

  var posts = Buffer.Buffer<Post>(1);
  var nextId: Nat = 0;

  stable var postsStable: [Post] = [];
  stable var nextIdStable: Nat = 0;

  var userPrincipal: Principal = Principal.fromText("un4fu-tqaaa-aaaab-qadjq-cai");

  public func receivePrincipalId(receiverPrincipalId: Text) : async () {
    userPrincipal := Principal.fromText(receiverPrincipalId);
    Debug.print("Received Principal ID: " # debug_show(userPrincipal));
  };

  /// function to create new post 
  public func createPost(title: Text, description: Text): async Result<(), Text> {
    Debug.print("Stored userPrincipal: " # debug_show(userPrincipal));
    if (title == "" or description == "") {
      return #err("Title and description must not be empty");
    };
    if (Text.size(title) > 125) {
      return #err("Title must be less than 125 characters");
    };
      let newPost: Post = {
        id = nextId;
        title = title;
        description = description;
        upvotes = 0;
        downvotes = 0;
        author = userPrincipal;
        isPublic = false;
      };
      posts.add(newPost);
      nextId += 1; // Increment after using the current ID
      return #ok(());
  };

  /// function to view all posts
  public query func viewPosts(): async [Post] {
    return Buffer.toArray(posts);
  };

  /// function to delete all posts
  public shared func deletePosts() {
    posts.clear();
  };

  /// pre-upgrade function
  system func preupgrade() {
    postsStable := Buffer.toArray(posts);
    nextIdStable := nextId;
  };

  /// post-upgrade function
  system func postupgrade() {
    posts := Buffer.Buffer<Post>(postsStable.size());
    for (post in postsStable.vals()) {
      
      posts.add(post);
    };
    nextId := nextIdStable;
    postsStable := [];
  };
};
