public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5 };
        int target = 5;
        int i = 0;

        System.out.println("first method  " + search(arr, target, i));
        System.out.println("second method  " + secondSearch(arr, target, i));

    }

    // 1st approach
    private static boolean search(int[] arr, int target, int i) {

        if (i >= arr.length) {
            return false;
        }
        // if (arr[i] == target) {
        // return true;
        // }

        // true or false true
        // true or true true
        // true or flase ture
        return   arr[i] == target ||  search(arr, target, i + 1) ;
    }

    // 2nd approach

    private static boolean secondSearch(int[] arr, int target, int i) {

        if (i >= arr.length) {
            return false;
        }
        if (arr[i] == target) {
            return true;
        }

        // true or false true
        // true or true true
        // true or flase ture
        return secondSearch(arr, target, i + 1);
    }

}
