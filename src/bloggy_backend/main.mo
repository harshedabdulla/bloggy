import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";

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
  type Result<A,B> = Result.Result<A,B>;

  var posts: [Post] = [];
  var nextId: Nat = 0;

  /// function to create new post 
  public shared ({caller}) func createPost(title: Text, description: Text): async Result<(), Text> {
    if (title == "" or description == "") {
      return #err("Title and description must not be empty");
    };
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous users are not allowed to create posts");
    };
    let post: Post = {
      id = nextId;
      title = title;
      description = description;
      upvotes = 0;
      downvotes = 0;
      author = caller;
      isPublic = false;  
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    return #ok(());
  };

  /// function to view all posts
  public query func viewPosts() : async [Post] {
    return posts;
  };

  /// function to delete all posts
  public shared func deletePosts() {
    posts := [];
  };
};
