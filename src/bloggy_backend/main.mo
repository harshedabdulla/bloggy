import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import Type "types";
import Validate "validate";


actor bloggy {
    
  type Result<A, B> = Result.Result<A, B>;

  var posts = Buffer.Buffer<Type.Post>(1);
  var nextId: Nat = 0;

  stable var postsStable: [Type.Post] = [];
  stable var nextIdStable: Nat = 0;

  /// function to create new post 
  public func createPost(title: Text, description: Text, principal: Principal): async Result.Result<(), Text> {
    switch(Validate.validatePost(title, description)) {
      case (#err(error)){
        return #err(error);
      };
      case (#ok()){
      };
    };
      let newPost: Type.Post = {
        id = nextId;
        title = title;
        description = description;
        upvotes = 0;
        downvotes = 0;
        author = principal;
        isPublic = false;
      };
      posts.add(newPost);
      nextId += 1; 
      return #ok(());
  };

  /// function to view all posts
  public query func viewPosts(): async [Type.Post] {
    return Buffer.toArray(posts);
  };

  /// Function to view a single post by id
  public query func viewPost(id: Nat): async Result<Type.Post, Text> {
    for (post in Buffer.toArray(posts).vals()) {
      if (post.id == id) {
        return #ok(post);
      };
    };
    return #err("Post not found");
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
    posts := Buffer.Buffer<Type.Post>(postsStable.size());
    for (post in postsStable.vals()) {
      posts.add(post);
    };
    nextId := nextIdStable;
    postsStable := [];
  };
};
