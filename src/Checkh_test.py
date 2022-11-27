import unittest
from random import choice

from Checkh import Checkh

class TestCheckh(unittest.TestCase):
    def test_apply_head_value(self):
        head = choice(range(50))
        checkh = Checkh(head)

        self.assertEqual(checkh._head, head)

    def test_applies_default_head(self):
        checkh = Checkh()

        self.assertEqual(checkh._head, 5)
