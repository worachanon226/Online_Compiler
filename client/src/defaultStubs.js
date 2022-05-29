const stubs = {};

stubs.cpp = `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}
`;

stubs.py = `print("Hello world!")`

export default stubs;