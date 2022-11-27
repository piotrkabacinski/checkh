from sys import argv
from subprocess import Popen, PIPE

head = int(argv[1]) if len(argv) > 1 else 5

command = f'git reflog | grep "checkout" | head -{head}'

results = (
    Popen(command, stdout=PIPE, shell=True)
    .communicate()[0]
    .decode("UTF-8")
    .splitlines()
)

branches = []

for index, result in enumerate(results):
    branch = result.split("to ")[1]

    if branch not in branches:
        branches.append(branch)
        print(f"{index}: {branch}")

selected_branch_index = input(f"\nSelect branch id from 0 to {len(branches)} to checkout or \"q\" to quit:")

if selected_branch_index == "q":
    exit()

selected_branch = branches[int(selected_branch_index)]

Popen(f"git checkout {selected_branch}", stdout=PIPE, shell=True)
