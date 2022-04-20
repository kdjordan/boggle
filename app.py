from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()

@app.route('/')
def index():
    """render title and instructions for our imported survey"""
    return render_template('base.html')

@app.route('/board')
def board():
    the_board = boggle_game.make_board()
    return render_template('board.html', board=the_board)



