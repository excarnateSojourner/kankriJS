const processTags = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'p', 'td', 'th'];

for (const tagName of processTags) {
	for (var element of document.getElementsByTagName(tagName)) {
		// Match a <script> block or an arbitrary HTML open tag or close tag. The blocks and tags are included in the array created by split().
		// [\s\S] is used to match any character including newlines.
		// I wanted to use capturing groups to capture and repeat the quotes (rather than repeating the whole groups with quotes in them), but all capturing groups are included in the returned array.
		var segments = element.innerHTML.split(/((?:<script(?:[^>]+|(?:'[\s\S]*?')|(?:"[\s\S]*?"))+>[\s\S]*?<\/script>)|(?:<\w(?:[^>]+|(?:'[\s\S]*?')|(?:"[\s\S]*?"))+>)|(?:<\/\w+>))/gm);
		// Even if tags are not in <open> and </close> pairs, all even indices are 'real content' and odd indices are tags (which we do not touch).
		for (var i = 0; i < segments.length; i += 2) {
			for (const re of badWords) {
				segments[i] = segments[i].replace(re, sub);
			}
		}
		element.innerHTML = segments.join('');
	}
}

function sub(match) {
	const firstChar = match[0];
	const firstCharLower = firstChar.toLowerCase();
	const options = goodWords[firstCharLower];
	var choice = options[Math.floor(Math.random() * options.length)];
	var replacement;
	// All uppercase.
	if (match.toUpperCase() == match && match.toLowerCase() !== match) {
		replacement = choice[0].toUpperCase();
	}
	// First letter is uppercase.
	else if (firstChar.toUpperCase() == firstChar && firstCharLower !== firstChar) {
		replacement = choice[0][0].toUpperCase() + choice[0].slice(1);
	}
	// Assumed to be all lowercase.
	else {
		replacement = choice[0];
	}
	// The replace escapes single quotes, but I have not written code to escape double quotes, ampersands, etc.
	return `<span class='replacedWord' title='${choice[1].replace("'", '&#39;')}'>${replacement}</span>`;
}
