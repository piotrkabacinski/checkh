from sys import argv

def get_amount_value(default_amount = 5 ):
    try:
        return int(argv[1]) if len(argv) > 1 else default_amount
    except:
         raise Exception(f"Cannot convert \"{argv[1]}\" to number")   

amount = get_amount_value()

print(amount, type(amount))
