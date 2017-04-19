# Dijkstra's Algorithm For WordLadders
I'm using Dijkstra's original algorithm for a wordLadder challenge on CodeFights, and this implementation fails due to timeout. Dijkstra's original algorithm runs in O(V^2), but to bring down the runtime to O(E + Vlg(V)) I will need to implement it via a priority queue.

Dijkstra's algorithm is appropriate for this challenge since it's a shortest path. I may also try an A* to see if that will work better.