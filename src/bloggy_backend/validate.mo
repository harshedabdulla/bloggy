import Text "mo:base/Text";
import Result "mo:base/Result";

module {
    public func validatePost(title: Text, description: Text): Result.Result<(), Text> {
        if (title == "" or description == "") {
            return #err("Title and description must not be empty");
        };
        if (Text.size(title) > 125) {
            return #err("Title must not exceed 125 characters");
        };
        return #ok(());
    };
}