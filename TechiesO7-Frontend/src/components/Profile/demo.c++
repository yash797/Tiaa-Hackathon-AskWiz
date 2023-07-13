#include <iostream>
#include <vector>
#include <utility> // For std::pair
#include <algorithm>

using namespace std;

int busRemaining() {
    int N, M;
    cin >> N >> M;

    vector<pair<int, int>> routes;

    // Read the starting and ending bus stations for all N buses
    for (int i = 0; i < N; i++) {
        int start, end;
        cin >> start >> end;
        routes.push_back(make_pair(start, end));
    }

    // Sort the routes based on the starting bus station
    sort(routes.begin(), routes.end());

    int remainingBuses = N; // Initially, all N buses are considered remaining

    // Check for overlapping routes and eliminate them
    for (int i = 0; i < N - 1; i++) {
        int currentEnd = routes[i].second;
        int nextStart = routes[i + 1].first;

        if (currentEnd >= nextStart) {
            // Found an overlapping route, eliminate one bus
            remainingBuses--;
        }
    }

    return remainingBuses;
}

int main() {
    int result = busRemaining();
    cout << "Number of buses remaining: " << result << endl;

    return 0;
}
