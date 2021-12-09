import random
import string

def generate_text():
    numChars = int(input("Input desired length of string: " ))
    ref = string.ascii_letters + string.digits + '\n' + ' '
    print(ref)
    newstr = random.choices(ref, k = numChars)

    return ''.join(newstr)
