#include<stdio.h>
int main()
{
    int a[5],b[5],i,l,t;
    for(i=0;i<5;i++) {
        scanf("%d",&a[i]);
    }
    for(l=4;l>=0;l--)
    printf("\n");
    for(i=0;i<5;i++)
   {  a[i];          }
    for(l=4;l>=0;l--)
    {  b[l];         }
     t=a[i];
     a[i]=b[l];
     b[l]=t;
    printf("%d",b[l]);
    




    return 0;
}