export declare const ABSOLUTE_LOCATION_PATH = "absolute-location-path";
export declare const ADDITIVE = "additive";
export declare const AND = "and";
export declare const DIVISIONAL = "divisional";
export declare const EQUALITY = "equality";
export declare const FILTER = "filter";
export declare const FUNCTION_CALL = "function-call";
export declare const GREATER_THAN = "greater-than";
export declare const GREATER_THAN_OR_EQUAL = "greater-than-or-equal";
export declare const INEQUALITY = "inequality";
export declare const LESS_THAN = "less-than";
export declare const LESS_THAN_OR_EQUAL = "less-than-or-equal";
export declare const LITERAL = "literal";
export declare const MODULUS = "modulus";
export declare const MULTIPLICATIVE = "multiplicative";
export declare const NEGATION = "negation";
export declare const NUMBER = "number";
export declare const OR = "or";
export declare const PATH = "path";
export declare const RELATIVE_LOCATION_PATH = "relative-location-path";
export declare const SUBTRACTIVE = "subtractive";
export declare const UNION = "union";
export declare const NODE_NAME_TEST = "node-name-test";
export declare const NODE_TYPE_TEST = "node-type-test";
export declare const PROCESSING_INSTRUCTION_TEST = "processing-instruction-test";
export interface OrNode {
	type: typeof OR;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface AndNode {
	type: typeof AND;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface EqualityNode {
	type: typeof EQUALITY | typeof INEQUALITY;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface RelationalNode {
	type: typeof GREATER_THAN | typeof GREATER_THAN_OR_EQUAL | typeof LESS_THAN | typeof LESS_THAN_OR_EQUAL;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface AdditiveNode {
	type: typeof ADDITIVE | typeof SUBTRACTIVE;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface MultiplicativeNode {
	type: typeof DIVISIONAL | typeof MULTIPLICATIVE | typeof MODULUS;
	lhs: ExprNode;
	rhs: ExprNode;
}
export interface UnaryNode {
	type: typeof NEGATION;
	lhs: ExprNode;
}
export interface UnionNode {
	type: typeof UNION;
	lhs: ExprNode;
	rhs: ExprNode;
}
export declare const ANCESTOR = "ancestor";
export declare const ANCESTOR_OR_SELF = "ancestor-or-self";
export declare const ATTRIBUTE = "attribute";
export declare const CHILD = "child";
export declare const DESCENDANT = "descendant";
export declare const DESCENDANT_OR_SELF = "descendant-or-self";
export declare const FOLLOWING = "following";
export declare const FOLLOWING_SIBLING = "following-sibling";
export declare const NAMESPACE = "namespace";
export declare const PARENT = "parent";
export declare const PRECEDING = "preceding";
export declare const PRECEDING_SIBLING = "preceding-sibling";
export declare const SELF = "self";
export declare type AxisSpecifier = typeof ANCESTOR | typeof ANCESTOR_OR_SELF | typeof ATTRIBUTE | typeof CHILD | typeof DESCENDANT | typeof DESCENDANT_OR_SELF | typeof FOLLOWING | typeof FOLLOWING_SIBLING | typeof NAMESPACE | typeof PARENT | typeof PRECEDING | typeof PRECEDING_SIBLING | typeof SELF;
export interface NodeNameTestNode {
	type: typeof NODE_NAME_TEST;
	name: string;
}
export interface NodeTypeTestNode {
	type: typeof NODE_TYPE_TEST;
	name: string;
}
export interface ProcessingInstructionTestNode {
	type: typeof PROCESSING_INSTRUCTION_TEST;
	name?: string;
}
export declare type NodeTestNode = NodeNameTestNode | NodeTypeTestNode | ProcessingInstructionTestNode;
export declare type PredicateNode = ExprNode;
export interface StepNode {
	axis: AxisSpecifier;
	test: NodeTestNode;
	predicates: PredicateNode[];
}
export interface PathNode {
	type: typeof PATH;
	filter: ExprNode;
	steps: StepNode[];
}
export interface AbsoluteLocationPathNode {
	type: typeof ABSOLUTE_LOCATION_PATH;
	steps: StepNode[];
}
export interface RelativeLocationPathNode {
	type: typeof RELATIVE_LOCATION_PATH;
	steps: StepNode[];
}
export declare type LocationNode = AbsoluteLocationPathNode | RelativeLocationPathNode;
export interface FilterNode {
	type: typeof FILTER;
	primary: ExprNode;
	predicates: PredicateNode[];
}
export declare const BOOLEAN = "boolean";
export declare const CEILING = "ceiling";
export declare const CONCAT = "concat";
export declare const CONTAINS = "contains";
export declare const COUNT = "count";
export declare const FALSE = "false";
export declare const FLOOR = "floor";
export declare const ID = "id";
export declare const LAST = "last";
export declare const LOCAL_NAME = "local-name";
export declare const NAME = "name";
export declare const NORMALIZE_SPACE = "normalize-space";
export declare const NOT = "not";
export declare const POSITION = "position";
export declare const ROUND = "round";
export declare const STARTS_WITH = "starts-with";
export declare const STRING_LENGTH = "string-length";
export declare const STRING = "string";
export declare const SUBSTRING_AFTER = "substring-after";
export declare const SUBSTRING_BEFORE = "substring-before";
export declare const SUBSTRING = "substring";
export declare const SUM = "sum";
export declare const TRANSLATE = "translate";
export declare const TRUE = "true";
export declare type FunctionName = typeof BOOLEAN | typeof CEILING | typeof CONCAT | typeof CONTAINS | typeof COUNT | typeof FALSE | typeof FLOOR | typeof ID | typeof LAST | typeof LOCAL_NAME | typeof NAME | typeof NORMALIZE_SPACE | typeof NOT | typeof NUMBER | typeof POSITION | typeof ROUND | typeof STARTS_WITH | typeof STRING_LENGTH | typeof STRING | typeof SUBSTRING_AFTER | typeof SUBSTRING_BEFORE | typeof SUBSTRING | typeof SUM | typeof TRANSLATE | typeof TRUE;
export interface FunctionNode {
	type: typeof FUNCTION_CALL;
	name: FunctionName;
	args: ExprNode[];
}
export interface LiteralNode {
	type: typeof LITERAL;
	string: string;
}
export interface NumberNode {
	type: typeof NUMBER;
	number: number;
}
export declare type PrimaryNode = LiteralNode | NumberNode | FunctionNode;
export declare type ExprNode = OrNode | AndNode | EqualityNode | RelationalNode | AdditiveNode | MultiplicativeNode | UnaryNode | UnionNode | PathNode | LocationNode | FilterNode | PrimaryNode;
export declare const COMMENT = "comment";
export declare const NODE = "node";
export declare const PROCESSING_INSTRUCTION = "processing-instruction";
export declare const TEXT = "text";
export default class XPathAnalyzer {
	private lexer;
	constructor(expression: string);
	parse(): ExprNode;
}