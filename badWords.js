// Lowercase regex strings to match words that should be replaced. '\\b' indicates that a word boundary is required, and is automatically added to the beginning of all of the patterns.

badWords = [
	// profanity
	"arse(kicking?)?(?=s?\\b)",
	"ass(\\b|(?=ed\\b)|(e(?=s\\b))|(hole)|(kicking?))",
	"((bad)|(dumb)|(half)|(hard)|(jack)|(kick)|(tight))(-| )?ass(ery)?",
	"((son of a )|(sons of ))?bi+tch(\\b|(e(?=s\\b))|(head(\\b|(?=ed\\b)|(?=s\\b))))",
	"bollocks?\\b",
	"cra+pp?",
	"cu+nt(?=s?\\b)",
	"(god ?)?da+m((mit\\b)|(n it\\b)|n)",
	"(go(d|(sh)) ?)?da+((ng)|(rn))(( ?it)|(?=(ed)?\\b))",
	"di+ck(head)?(?=((ing?)|s)?\\b)",
	"douche( ?bag)?",
	"dra+t\\b",
	"fag(got)?\\b",
	"freak(?=ing?\\b)",
	"fri+gg?(?=((ing?)|s)?\\b)",
	"((dunder)|(mother))?fu+ck((-| )?((head)|(load)))?",
	"godawful(?=(ly)?\\b)",
	"ha+g(?=s?\\b)",
	"he+ck(?=(ing?)?\\b)",
	"idiot(?=s?\\b)",
	"imbecile(?=s?\\b)",
	"je+rk((face)|(wad))(?=s?\\b)",
	"lordy\\b",
	"moron(?=s?\\b)",
	"oh (my )?((go+(d|(sh)))|(lordy?))\\b",
	"piss(?=((ed)|(es)|(ing?)|y)?\\b)",
	"pissface(?=(d|s)?\\b)",
	"(((bull)|(dip)|(dog)|(horse)|(jack)) ?)?shi+t(t|((-| )?((head)|(load))))?",
	"shu+t u+p\\b",
	"ti+t(?=s?\\b)",
	// recent events
	"corona(virus)?\\b",
	"covid((-| )19)?\\b",
	"lockdown\\b",
	"mask(?=s?\\b)",
	"pandemic\\b",
	"vaccine(?=s?\\b)",
	"vaccinat((?=ed\\b)|(e(?=s\\b))|(?=ing?\\b))"
].map(pattern => new RegExp(`\\b${pattern}`, 'gim'));