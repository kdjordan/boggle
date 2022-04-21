from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()


def check_word(wrd):
    res = boggle_game.check_valid_word(session['BOARD'], wrd)
    if res == 'ok':
        the_list = session['GOOD_WORDS']
        the_list.append(wrd)
        session['GOOD_WORDS'] = the_list
    elif res == 'not-on-board':
        the_list = session['NOT_ON_BOARD']
        the_list.append(wrd)
        session['NOT_ON_BOARD'] = the_list
    elif res == 'not-word':
        the_list = session['NOT_WORD']
        the_list.append(wrd)
        session['NOT_WORD'] = the_list
    return res


@app.route('/')
def index():
    """Set up session elements and redirect to make board with info"""
    session['BOARD'] = boggle_game.make_board()
    session['GOOD_WORDS'] = []
    session['NOT_ON_BOARD'] = []
    session['NOT_WORD'] = []
    return redirect('/board')


@app.route('/board')
def board():
    """sets up game and renders template to begin game"""
    return render_template('board.html')


@app.route('/submit', methods=["POST"])
def submit():
    """Checks for word in board from submitted ajax call, returns JSON of res and the word"""
    word = request.get_json()['word']
    # check word in board and update session
    res = check_word(word)
    return jsonify({res: word})




