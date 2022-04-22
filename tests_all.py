from app import app
from flask import session
from unittest import TestCase

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!

    def test_index_redirect(self):
        """Test to see if our index page redirects to /board"""
        with app.test_client() as client:
            res = client.get('/', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('BOGGLE !', html)

    def test_board_init(self):
        """Test to see if our index page initiates board into session"""
        with app.test_client() as client:
            # make call to index to set up session with board
            res = client.get('/', follow_redirects=True)
            self.assertEqual(len(session['BOARD']), 5)

    def test_submit(self):
        """Test to see if our return value from /submit is a dictionary"""
        with app.test_client() as client:
            client.get('/', follow_redirects=True)
            res = client.post('/submit', json={'word':'test'})
            json = res.get_json()
            self.assertIsInstance(json, dict)

    def test_words_in_session(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['GOOD_WORDS'] = ['good']
                change_session['NOT_WORD'] = ['nottaword']
                change_session['NOT_ON_BOARD'] = ['supercalifragilicious']
                change_session['NUM_GAMES'] = 9
            res = client.get('/board')
            self.assertEqual(session['GOOD_WORDS'], ['good'])
            self.assertEqual(session['NOT_WORD'], ['nottaword'])
            self.assertEqual(session['NOT_ON_BOARD'], ['supercalifragilicious'])
            self.assertEqual(session['NUM_GAMES'], 9)

    def test_finalize_redirect(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['NUM_GAMES'] = 9
            res = client.get('/finalize')
            self.assertEqual(res.status_code, 302)






