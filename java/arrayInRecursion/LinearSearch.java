package arrayInRecursion;

public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 5, 4 };
        // int target = 5;
        // int i = 0;

        LinearSearch obj = new LinearSearch();

        // System.out.println("first method " + search(arr, target, i));
        // System.out.println("second method " + secondSearch(arr, target, i));

        System.out.println("second method  " + obj.checkSorted(arr, 0, 1));

    }

    // 1st approach

    /*
     * private static boolean search(int[] arr, int target, int i) {
     * 
     * 
     * if (i >= arr.length) {
     * return false;
     * }
     * // if (arr[i] == target) {
     * // return true;
     * // }
     * 
     * // true or false true
     * // true or true true
     * // true or flase ture
     * return arr[i] == target || search(arr, target, i + 1) ;
     * }
     * 
     */

    // 2nd approach

    /*
     * 
     * private static boolean secondSearch(int[] arr, int target, int i) {
     * 
     * if (i >= arr.length) {
     * return false;
     * }
     * if (arr[i] == target) {
     * return true;
     * }
     * 
     * // true or false true
     * // true or true true
     * // true or flase ture
     * return secondSearch(arr, target, i + 1);
     * }
     * 
     * 
     */

    public boolean checkSorted(int[] arr, int i, int j) {


        if (j > arr.length-1) {
            return true;

        }

        return arr[i] <= arr[j] && checkSorted(arr, i + 1, j + 1);
    }


    
}
