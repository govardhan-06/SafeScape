# simple_test.py
import sys

def main():
    raise ValueError("Testing exception handling")

if __name__ == "__main__":
    sys.excepthook = sys.__excepthook__  # Reset to default
    try:
        main()
    except Exception as e:
        import traceback
        traceback.print_exc()
