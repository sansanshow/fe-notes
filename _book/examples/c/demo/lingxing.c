#include<stdio.h>
int main()
{
    int size = 4, // 上半部分行数
        i,
        j,
        k,
        spaceNum, // 空格数
        num; // * 数量
    printf("输入菱形大小-奇数\n");
    scanf("%d", &size);
    if (size <= 0) {
        printf("输入大于0的数字\n");
        return 0;
    }
    if (size % 2 == 0) {
        printf("请输入-奇数\n");
        return 0;
    }
    size = (size + 1) / 2;
    /**
     * size = 4 
     *    *   空格 = size - 1 - i ， *：2i+1
     *   ***
     *  *****
     * *******
     *  *****
     *   ***
     *    *
     */
    // 输出上半部分
    for (i = 0; i < size; i++)
    {
        // 空格
        spaceNum = size - 1 - i;
        num = 2 * i + 1;
        for (j = 0; j < spaceNum; j++)
        {
            printf(" ");
        }
        for (j = 0; j < num; j++)
        {
            printf("*");
        }
        printf("\n");
    }

    for (i = size - 2; i >= 0; i--)
    {
        // 空格
        spaceNum = size - 1 - i;
        num = 2 * i + 1;
        for (j = 0; j < spaceNum; j++)
        {
            printf(" ");
        }
        for (j = 0; j < num; j++)
        {
            printf("*");
        }
        printf("\n");
    }
    printf("\n");
    
    return 0;
}