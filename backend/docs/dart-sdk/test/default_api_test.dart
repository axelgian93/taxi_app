import 'package:test/test.dart';
import 'package:openapi/openapi.dart';


/// tests for DefaultApi
void main() {
  final instance = Openapi().getDefaultApi();

  group(DefaultApi, () {
    //Future healthzGet() async
    test('test healthzGet', () async {
      // TODO
    });

  });
}
