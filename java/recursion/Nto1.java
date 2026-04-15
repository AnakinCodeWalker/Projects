  
    public class Nto1 {
    public static void main(String[] args) {

        Nto1 obj = new Nto1();
       
        // obj.printIncreasing(5);
        // System.out.println(obj.productNto1(5));
        // System.out.println(obj.sumNto1(5));
        // System.out.println(obj.sumOfIndiviualDigit(12345, 0));
        // System.out.println(obj.reverseNumber(12345, 0));

        // int[] arr = { 1, 1, 2, 1 };
        // System.out.println(obj.palindrome(arr, 0, arr.length - 1));
      
        System.out.println(obj.countZeros(1020203, 0));
   
    }

    int count = 0;

    public void printIncreasing(int n) {
        if (n == 0)
            return;

        System.out.println(n); // 5 4 3 2 1

        printIncreasing(n - 1);

        if (count != 1) {
            count++;
            System.out.println("");
            System.out.println("1 to n : ");
            System.out.println("");

        }

        System.out.println(n); // 1 2 3 4 5

    }

    public int productNto1(int n) {

        if (n == 1) {
            return 1;
        } else {
            return n * productNto1(n - 1);

        }

    }

    public int sumNto1(int n) {

        if (n == 1) {
            return 1;
        } else {
            return n + sumNto1(n - 1);

        }

    }

    public int sumOfIndiviualDigit(int n, int currSum) {

        if (n == 0) {
            return currSum;
        }
        int curr = n % 10;
        currSum += curr;
        System.out.println(currSum);
        return sumOfIndiviualDigit(n / 10, currSum);
    }

    public int reverseNumber(int n, int rev) {

        if (n == 0)
            return rev;

        int curr = n % 10;
        rev = rev * 10 + curr;
        return reverseNumber(n / 10, rev);

    }

    public boolean palindrome(int[] n, int l, int r) {

        if (l > r)
            return true;

        return n[l] == n[r] && palindrome(n, l + 1, r - 1); // short circuit
    }

    public int countZeros(int n, int count) {

        if (n == 0)
            return count;
        int rem = n % 10;

        if (rem == 0) {
            return countZeros(n / 10, count += 1);
        } else {
            return countZeros(n / 10, count);

        }

    }

}


