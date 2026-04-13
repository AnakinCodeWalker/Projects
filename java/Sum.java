public class Sum {

    int currentSum = 0;

    void sumofNumber(int n) {
        if (n == 0) {
            return;
        }
         sumofNumber(n - 1);

         System.out.println("current value of n " + n);

         currentSum += n;

System.out.println("currentSum " + currentSum);
    }


    public static void main(String[] args) {
        Sum obj = new Sum();

        obj. sumofNumber(3);
        System.out.println(obj.currentSum);
    }
}
