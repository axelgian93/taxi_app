//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:openapi/src/model/admin_diagnostics_matching200_response_env.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_diagnostics_matching200_response.g.dart';

/// AdminDiagnosticsMatching200Response
///
/// Properties:
/// * [postgisAvailable] 
/// * [env] 
/// * [counters] 
@BuiltValue()
abstract class AdminDiagnosticsMatching200Response implements Built<AdminDiagnosticsMatching200Response, AdminDiagnosticsMatching200ResponseBuilder> {
  @BuiltValueField(wireName: r'postgisAvailable')
  bool? get postgisAvailable;

  @BuiltValueField(wireName: r'env')
  AdminDiagnosticsMatching200ResponseEnv? get env;

  @BuiltValueField(wireName: r'counters')
  BuiltMap<String, int>? get counters;

  AdminDiagnosticsMatching200Response._();

  factory AdminDiagnosticsMatching200Response([void updates(AdminDiagnosticsMatching200ResponseBuilder b)]) = _$AdminDiagnosticsMatching200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminDiagnosticsMatching200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminDiagnosticsMatching200Response> get serializer => _$AdminDiagnosticsMatching200ResponseSerializer();
}

class _$AdminDiagnosticsMatching200ResponseSerializer implements PrimitiveSerializer<AdminDiagnosticsMatching200Response> {
  @override
  final Iterable<Type> types = const [AdminDiagnosticsMatching200Response, _$AdminDiagnosticsMatching200Response];

  @override
  final String wireName = r'AdminDiagnosticsMatching200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminDiagnosticsMatching200Response object, {
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
        specifiedType: const FullType(AdminDiagnosticsMatching200ResponseEnv),
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
    AdminDiagnosticsMatching200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminDiagnosticsMatching200ResponseBuilder result,
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
            specifiedType: const FullType(AdminDiagnosticsMatching200ResponseEnv),
          ) as AdminDiagnosticsMatching200ResponseEnv;
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
  AdminDiagnosticsMatching200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminDiagnosticsMatching200ResponseBuilder();
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

