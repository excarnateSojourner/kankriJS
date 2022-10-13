import argparse
import collections
import json
import random
import wikitextparser
import xml.dom.pulldom

# The International Radiotelephony Spelling Alphabet
# https://en.wikipedia.org/wiki/NATO phonetic alphabet
IRSA = ['alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'x-ray', 'yankee', 'zulu']

# a subset of the POS headings that may actually appear
POS_HEADINGS = {'Adjective', 'Interjection', 'Noun', 'Preposition', 'Pronoun', 'Verb'}

def main():
	parser = argparse.ArgumentParser(description='Given a list of good word candidates, randomly choose some for each letter of the alphabet, and collect information related to them.')
	parser.add_argument('pages_path', help='The XML file from Wiktionary containing words and definitions (among other things).')
	parser.add_argument('ids_path', help='A text file containing, on each line, the ID of a candidate page.')
	parser.add_argument('output_path', help='The JS file to write to.')
	parser.add_argument('count', type=int, help='The number of words to select.')
	args = parser.parse_args()

	with open(args.ids_path) as idsFile:
		ids = [int(line) for line in idsFile]

	winners = set(random.sample(ids, args.count))

	# collect data about winners
	goodWords = collections.defaultdict(dict)
	doc = xml.dom.pulldom.parse(args.pages_path)
	for event, node in doc:
		if event == xml.dom.pulldom.START_ELEMENT and node.tagName == 'page':
			doc.expandNode(node)
			id_ = int(getDescendantContent(node, 'id'))
			if id_ in winners:
				title = getDescendantContent(node, 'title')
				parsedText = wikitextparser.parse(getDescendantContent(node, 'text'))
				englishSection = next(section for section in parsedText.get_sections(level=2) if section.title == 'English')
				posSections = [section for section in englishSection.sections if section.level <= 4 and section.title in POS_HEADINGS]
				try:
					section = random.choice(posSections)
				except:
					print(f'Warning: No recognized part of speech heading for {title}, so skipping it.')
					continue
				# choose the first definition such that, after templates, etc are removed, multiple characters remain
				try:
					definition = next(pt for pt in (wikitextparser.parse(defi).plain_text().strip() for defi in section.get_lists()[0].items) if len(pt) > 1)
				except StopIteration:
					definition = ''
				goodWords[title[0].casefold()][title] = definition

	# ensure that all letters have at least one good word
	for word in IRSA:
		# this is how Wiktionary phrases their definitions for IRSA words
		goodWords.setdefault(word[0], {word: f'Code word for the letter {word[0].upper()} in the NATO/ICAO spelling alphabet.'})

	# the JS needs to randomly select one of the words for a given letter, which is made easier if the words are in a list rather than dict
	goodWordsLists = {k: list(v.items()) for k, v in goodWords.items()}
	with open(args.output_path, 'w') as outFile:
		outFile.write('goodWords = ')
		json.dump(goodWordsLists, outFile, indent='\t')

def getDescendantContent(node, childName):
	try:
		child = node.getElementsByTagName(childName)[0]
		child.normalize()
		return child.firstChild.data
	except StopIteration:
		return None

if __name__ == '__main__':
	main()
