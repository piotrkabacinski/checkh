from sys import argv
from subprocess import Popen, PIPE


class Checkh:
    _head = None
    _branches = []

    def create_branches(self):
        command = f'git reflog | grep "checkout" | head -{self._head}'

        results = (
            Popen(command, stdout=PIPE, shell=True)
            .communicate()[0]
            .decode("UTF-8")
            .splitlines()
        )

        for result in results:
            branch = result.split("to ")[1]

            if branch not in self._branches:
                self._branches.append(branch)

    def select_branch(self):
        for index, branch in enumerate(self._branches):
            print(f"{index}: {branch}")

        message = f"""
            Select branch id (from 0 to {len(self._branches) - 1}) to checkout or \"q\" to quit:
        """

        selected_branch_index = input(f"\n{message.strip()} ")

        if selected_branch_index == "q":
            exit()

        selected_branch = self._branches[int(selected_branch_index)]

        self._checkout_to_branch(selected_branch)

    def _checkout_to_branch(self, branch):
        Popen(f"git checkout {branch}", stdout=PIPE, shell=True)

    def __init__(self, head=5):
        self._head = head


if __name__ == "__main__":
    head = int(argv[1]) if len(argv) > 1 else 5

    checkh = Checkh(head)
    checkh.create_branches()
    checkh.select_branch()
