module.exports = {
	'parserOpts': {
		'noteKeywords': ['BREAKING CHANGE', 'BREAKING CHANGES'],
		'headerPattern': /^(\w*)(?:\((.*)\))?: (.*)$/,
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
		
			const type = typeMap[commit.type] || commit.type;
		
			if (typeof commit.hash === 'string') {
				commit.shortHash = commit.hash.substring(0, 7);
			}
		
			if (typeof commit.subject === 'string') {
				commit.subject = commit.subject.charAt(0).toLowerCase() + commit.subject.slice(1);
			}
		
			return {
				type: type,
				scope: commit.scope || '',
				subject: commit.subject || '',
				body: commit.body || '',
				breaking: commit.notes.some(note => note.title.toLowerCase().includes('breaking change')),
				issues: commit.references.map(ref => ref.issue).filter(issue => issue),
			};
		},
		'groupBy': 'type',
		'commitGroupsSort': 'title',
		'commitsSort': ['scope', 'subject'],
		'noteGroupsSort': 'title',
		'notesSort': ['title', 'text'],
	}
};
