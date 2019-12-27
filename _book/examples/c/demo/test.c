#include<stdio.h>
#define TRUE 1
int main() {
    int score;
    scanf("%d", &score);
    printf("%u\n", score);
    int dd = (score-5) / 10;
    // 95-100
    switch (dd)
    {
        case 9:
        // case 10:
            // A
            /* code */
            printf("%c", 'A');
            break;
        
        default: {
            printf("%c", 'N');
            break;
        }
    }
    // bool TRUE = true;
    // switch(TRUE) {
    //     case score >= 90: {
    //         printf("%s", 'A');
    //         break;
    //     }
    //     default: {
    //         printf("%s", 'N');
    //         break;
    //     }
    // }
    return 0;
}