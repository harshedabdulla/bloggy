module {
    public type Post = {
    id: Nat;
    title: Text;
    description: Text;
    upvotes: Nat;
    downvotes: Nat;
    author: Principal;
    isPublic: Bool;
  };
}