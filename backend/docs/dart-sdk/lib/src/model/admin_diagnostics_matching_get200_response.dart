//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:openapi/src/model/admin_diagnostics_matching_get200_response_env.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_diagnostics_matching_get200_response.g.dart';

/// AdminDiagnosticsMatchingGet200Response
///
/// Properties:
/// * [postgisAvailable] 
/// * [env] 
/// * [counters] 
@BuiltValue()
abstract class AdminDiagnosticsMatchingGet200Response implements Built<AdminDiagnosticsMatchingGet200Response, AdminDiagnosticsMatchingGet200ResponseBuilder> {
  @BuiltValueField(wireName: r'postgisAvailable')
  bool? get postgisAvailable;

  @BuiltValueField(wireName: r'env')
  AdminDiagnosticsMatchingGet200ResponseEnv? get env;

  @BuiltValueField(wireName: r'counters')
  BuiltMap<String, int>? get counters;

  AdminDiagnosticsMatchingGet200Response._();

  factory AdminDiagnosticsMatchingGet200Response([void updates(AdminDiagnosticsMatchingGet200ResponseBuilder b)]) = _$AdminDiagnosticsMatchingGet200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminDiagnosticsMatchingGet200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminDiagnosticsMatchingGet200Response> get serializer => _$AdminDiagnosticsMatchingGet200ResponseSerializer();
}

class _$AdminDiagnosticsMatchingGet200ResponseSerializer implements PrimitiveSerializer<AdminDiagnosticsMatchingGet200Response> {
  @override
  final Iterable<Type> types = const [AdminDiagnosticsMatchingGet200Response, _$AdminDiagnosticsMatchingGet200Response];

  @override
  final String wireName = r'AdminDiagnosticsMatchingGet200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminDiagnosticsMatchingGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.postgisAvailable != null) {
      yield r'postgisAvailable';
      yield serializers.serialize(
        object.postgisAvailable,
        specifiedType: const FullType(bool),
      );
    }
    if (object.env != null) {
      yield r'env';
      yield serializers.serialize(
        object.env,
        specifiedType: const FullType(AdminDiagnosticsMatchingGet200ResponseEnv),
      );
    }
    if (object.counters != null) {
      yield r'counters';
      yield serializers.serialize(
        object.counters,
        specifiedType: const FullType(BuiltMap, [FullType(String), FullType(int)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminDiagnosticsMatchingGet200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminDiagnosticsMatchingGet200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'postgisAvailable':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.postgisAvailable = valueDes;
          break;
        case r'env':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AdminDiagnosticsMatchingGet200ResponseEnv),
          ) as AdminDiagnosticsMatchingGet200ResponseEnv;
          result.env.replace(valueDes);
          break;
        case r'counters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltMap, [FullType(String), FullType(int)]),
          ) as BuiltMap<String, int>;
          result.counters.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminDiagnosticsMatchingGet200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminDiagnosticsMatchingGet200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

