#include<stdio.h>

int main() {
    char grade;
    printf("please input your score:\n");
    scanf("%c", &grade);
    printf("your score:");
    switch(grade)
    {
        case 'A': {
            printf("85-100\n");
            break;
        }
        case 'B': {
            printf("75-85\n");
            break;
        }
        case 'C': {
            printf("60-75\n");
            break;
        }
        default:{
            printf("bad\n");
            break;
        }
    }
    return 0;
}