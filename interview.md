
```javascript
class Task {
    constructor(timeout) {
        this._timeout = timeout;
    }
    
    run() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('about to resolve');
                resolve(() => console.log('hello world'));
            }, this._timeout);
        })
    }
}


const task = new Task(1000);
task.run().then((res) => {
    res(); // print out 'hello world'
});
 
```
 
```java 
 // CSCI 101 -> CSCI 201 -> CSCI 301 -> CSCI 401
 //                      -> CSCI 350 ->
 
 // A -> B -> C -> E
//         -> D ->

// [[A,B], [B,C], [B,D], [C,E]. [D,E]]
// [A, B, C, D, E]
// import java.util.*;

class Solution {
    public String[] getOrder(String[][] edges) {
        if (edges == null || edges.length < 1) {
            return null;
        }
        
        Map<String, Set<String>> outMap = new HashMap<>();
        
        // build the graph
        for (String[] edge : edges) {
            if (!outMap.containsKey(edge[0])) {
                outMap.put(edge[0], new HashSet<String>());
            }
            if (!outMap.containsKey(edge[1])) {
                outMap.put(edge[1], new HashSet<String>());
            }
            outMap.get(edge[0]).add(edge[1]);
        }
        
        Set<String> visited = new HashSet<>();
        Stack<String> stack = new Stack<>();
        for (String node : outMap.keySet()) {
            if (!visited.contains(node)) {
                Set<String> path = new HashSet<>();
                helper(node, visited, stack, outMap, path);
            }
        }
        
        String[] result = new String[stack.size()];
        for (int i = result.length - 1; i >= 0; i--) {
            result[i] = stack.pop();
        }
        return result;
    }
    
    private void helper(String node, Set<String> visited, Stack<String> stack, Map<String, Set<String>> outMap, Set<String> path) {
        if (path.contains(node)) {
            // meet a circle;
            return;
        }
        path.add(node);
        visited.add(node);
        
        // solve its dependencies
        for (String other : outMap.get(node)) {
            if (!visited.contains(node)) {
                helper(other, visited, stack, outMap, path);
            }
        }
        
        stack.push(node);
        path.remove(node);
    }
    
    public static void main(String[] args) {
        Solution s = new Solution();
        String[] result = s.getOrder(new String[][]{{"A","B"}, {"B","C"}, {"B","D"}, {"C","E"}, {"D","E"}});
        System.out.println(Arrays.toString(result));
    }
}
```