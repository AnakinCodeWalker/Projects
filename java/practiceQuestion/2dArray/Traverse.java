
public class Traverse {

    public static void main(String[] args) {

        int[][] arr = {
                { 1, 2, 3 },
                { 4, 5, 6 },
                { 7, 8, 9 }

        };

        // traverse("2d array traversal ", arr);
        // diagonalTraversal("diagonal traversal of 2d array ", arr);
        // transpose("transpose traversal", arr);
        // rowreversal("row reversal", arr);
        // columnreversal(null, arr);
        borderTraversal("yet to implement border traversal ", arr);
    }

    public static void traverse(String s, int[][] arr) {

        System.out.println(s);

        for (int row = 0; row < arr.length; row++) {
            for (int column = 0; column < arr[row].length; column++)

                System.out.print(arr[row][column]);

            // System.out.println("number of column in "+ arr.length +" row
            // "+arr[row].length );

            System.out.println("");

        }
        System.out.println("");
    }

    public static void diagonalTraversal(String s, int[][] arr) {
        System.out.println(s);
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++)
                if (i == j)
                    System.out.print(arr[i][j]);

            // System.out.println("");
        }

    }

    public static void transpose(String s, int[][] arr) {

        for (int row = 0; row < arr.length; row++) {
            for (int column = row + 1; column < arr[row].length; column++) {
                int temp = arr[row][column];
                arr[row][column] = arr[column][row];
                arr[column][row] = temp;

            }
        }
        System.out.println("");
        traverse(s, arr);
    }

    public static void rowreversal(String s, int[][] arr) {

        traverse(s, arr);

        for (int row = 0; row < arr.length; row++) {
            int left = 0;
            int right = arr.length - 1;
            while (left < right) {
                int temp = arr[row][left];
                arr[row][left] = arr[row][right];
                arr[row][right] = temp;
                left++;
                right--;
            }
        }
        System.out.println("");
        traverse(s, arr);
    }

    public static void columnreversal(String s, int[][] arr) {
        traverse(s, arr);
        for (int row = 0; row < arr.length; row++) {
            int top = 0;
            int bottom = arr[0].length - 1;
            while (top < bottom) {
                int temp = arr[top][row];
                arr[top][row] = arr[bottom][row];
                arr[bottom][row] = temp;
                top++;
                bottom--;
            }
        }
        traverse(s, arr);
    }

    public static void borderTraversal(String s ,int[][]arr){
        traverse(s, arr);
    }
}