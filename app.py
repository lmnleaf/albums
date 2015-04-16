from flask import Flask, render_template, jsonify


app = Flask(__name__)


ALBUMS = [
  {
    '_id': 0,
    'artist': 'Modest Mouse',
    'title': 'The Moon And Antarctica',
    'year': '2000',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/0/00/TheMoonAntarctica.jpg'
  },
  {
    '_id': 1,
    'artist': 'The Mars Volta',
    'title': 'De-Loused in the Comatorium',
    'year': '2003',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/2/29/De-Loused_in_the_Comatorium.jpeg'
  },
  {
    '_id': 2,
    'artist': 'Arcade Fire',
    'title': 'Neon Bible',
    'year': '2007',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/e/ea/Arcade_Fire_-_Neon_Bible.jpg'
  },
  {
    '_id': 3,
    'artist': 'Arcade Fire',
    'title': 'The Suburbs',
    'year': '2010',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/8/81/Arcade_Fire_-_The_Suburbs.jpg'
    
  },
  {
    '_id': 4,
    'artist': 'Arcade Fire',
    'title': 'Reflektor',
    'year': '2013',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/5/57/ArcadeFireReflektor.jpg'
  },
  {
    '_id': 5,
    'artist': 'Modest Mouse',
    'title': 'Strangers To Ourselves',
    'year': '2015',
    'image_url': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Strangers_to_Ourselves_cover.jpg/440px-Strangers_to_Ourselves_cover.jpg'
  },
]

@app.route('/albums')
def get_albums():
  return jsonify(albums=ALBUMS)

@app.route('/album/<idx>')
def get_album(idx):
  return jsonify(album=ALBUMS[int(idx)])

@app.route('/')
def index():
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
