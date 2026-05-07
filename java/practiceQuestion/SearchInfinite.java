public class SearchInfinite {

    public static void main(String[] args) {

        SearchInfinite obj = new SearchInfinite();
        int target = 10;
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 };
        int[] range = obj.findRange(arr, target);
        int start = range[0];
        int end = range[1];

        int ans = obj.binarySearch(arr, target, start, end);
        System.out.println(ans);
    }

    public int[] findRange(int[] arr, int target) {

        int start = 0;
        int end = start + 1;

        while (arr[end] < target) {
            start = end + 1;
            end = end * 2;
        }
        return new int[] { start, end };

    }

    public int binarySearch(int[] arr, int target, int start, int end) {

        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (arr[mid] == target)
                return mid;
            else if (arr[mid] < target)
                start = mid + 1;
            else
                end = mid - 1;
        }
        return -1;

    }
}