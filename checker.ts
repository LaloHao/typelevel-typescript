import * as ts from 'typescript';
import * as fs from 'fs';

function printRecursiveFrom(
  node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile, checker: ts.TypeChecker
) {
  const indentation = "-".repeat(indentLevel);
  const syntaxKind = ts.SyntaxKind[node.kind];
  const nodeText = node.getText(sourceFile);
  // const type = checker.getTypeAtLocation(node);
  console.log(`${indentation}${syntaxKind}: ${nodeText}`);
  // console.log(`${indentation}${syntaxKind}: ${nodeText}`);

  node.forEachChild(
    child =>
      printRecursiveFrom(child, indentLevel + 1, sourceFile, checker)
  );
}
t
function getDescriptor(type: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
  switch (type.kind) {
    // case ts.SyntaxKind.ArrowFunction:
    //   return ts.createArrowFunction(().text);
    case ts.SyntaxKind.StringLiteral:
      return ts.createStringLiteral((type as ts.StringLiteral).text);
    case ts.SyntaxKind.PropertySignature:
      return getDescriptor((type as ts.PropertySignature).type, typeChecker);
    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.InterfaceDeclaration:
      return ts.createObjectLiteral(
        (type as ts.InterfaceDeclaration).members.map(
          (m): ts.ObjectLiteralElementLike => ts.createPropertyAssignment(m.name || '', getDescriptor(m, typeChecker)),
        ),
      );
    case ts.SyntaxKind.TypeReference:
      const symbol = typeChecker.getSymbolAtLocation((type as ts.TypeReferenceNode).typeName);
      const declaration = ((symbol && symbol.declarations) || [])[0];
      return getDescriptor(declaration, typeChecker);
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.BooleanKeyword:
    case ts.SyntaxKind.AnyKeyword:
    case ts.SyntaxKind.StringKeyword:
      return ts.createLiteral('string');
    case ts.SyntaxKind.ArrayType:
    default:
      return ts.createLiteral('unknown');
  }
}

function generate() {
  const config: ts.CompilerOptions = {
    noLib: true,
  };
  const files = process.argv.slice(2)
  const program = ts.createProgram(files, {});
  const checker = program.getTypeChecker();

  // for (const f of files) {
  for (const f of files) {
    const file = program.getSourceFile(f);

    // if (file.isDeclarationFile) return;
    // console.log(file.fileName);
    if (ts.isSourceFile(file)) {
      ts.forEachChild(file, f => printRecursiveFrom(f, 0, file, checker));
    }
  }
}

generate();
