module.exports = {
	'parserOpts': {
		'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES'],
		'headerPattern': /^(\w*)\(?(\w*)\)?: (.*)$/,
		'headerCorrespondence': ['type', 'scope', 'subject'],
		'ticketPrefixes': ['PROJ-', 'TICKET-']
	},
	'writerOpts': {
		'transform': (commit, context) => {
			const typeMap = {
				'feat': 'Feature',
				'fix': 'Bug Fix',
				'docs': 'Documentation',
				'style': 'Styles',
				'refactor': 'Code Refactoring',
				'perf': 'Performance Improvements',
				'test': 'Tests',
				'build': 'Build System',
				'ci': 'Continuous Integration',
				'chore': 'Chores',
				'revert': 'Reverts'
			};

			const type = commit.type && typeMap[commit.type] ? typeMap[commit.type] : (commit.type || 'Other');
			const shortHash = commit.hash ? commit.hash.substring(0, 7) : '';
			const subject = commit.subject ? commit.subject.charAt(0).toLowerCase() + commit.subject.slice(1) : '';

			return {
				type: type,
				header: commit.header || '',
				scope: commit.scope || '',
				subject: subject,
				shortHash: shortHash,
				body: commit.body || '',
				title: 'test'
			};
		},
		'groupBy': 'type',
		'commitGroupsSort': 'header',
		'commitsSort': ['scope', 'subject'],
		'noteGroupsSort': 'header',
		'notesSort': ['header', 'text']
	}
};
