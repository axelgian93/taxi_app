//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_diagnostics_matching200_response_env.g.dart';

/// AdminDiagnosticsMatching200ResponseEnv
///
/// Properties:
/// * [MATCH_RADIUS_M] 
/// * [LOCATION_MAX_AGE_MIN] 
@BuiltValue()
abstract class AdminDiagnosticsMatching200ResponseEnv implements Built<AdminDiagnosticsMatching200ResponseEnv, AdminDiagnosticsMatching200ResponseEnvBuilder> {
  @BuiltValueField(wireName: r'MATCH_RADIUS_M')
  int? get MATCH_RADIUS_M;

  @BuiltValueField(wireName: r'LOCATION_MAX_AGE_MIN')
  int? get LOCATION_MAX_AGE_MIN;

  AdminDiagnosticsMatching200ResponseEnv._();

  factory AdminDiagnosticsMatching200ResponseEnv([void updates(AdminDiagnosticsMatching200ResponseEnvBuilder b)]) = _$AdminDiagnosticsMatching200ResponseEnv;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminDiagnosticsMatching200ResponseEnvBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminDiagnosticsMatching200ResponseEnv> get serializer => _$AdminDiagnosticsMatching200ResponseEnvSerializer();
}

class _$AdminDiagnosticsMatching200ResponseEnvSerializer implements PrimitiveSerializer<AdminDiagnosticsMatching200ResponseEnv> {
  @override
  final Iterable<Type> types = const [AdminDiagnosticsMatching200ResponseEnv, _$AdminDiagnosticsMatching200ResponseEnv];

  @override
  final String wireName = r'AdminDiagnosticsMatching200ResponseEnv';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminDiagnosticsMatching200ResponseEnv object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.MATCH_RADIUS_M != null) {
      yield r'MATCH_RADIUS_M';
      yield serializers.serialize(
        object.MATCH_RADIUS_M,
        specifiedType: const FullType(int),
      );
    }
    if (object.LOCATION_MAX_AGE_MIN != null) {
      yield r'LOCATION_MAX_AGE_MIN';
      yield serializers.serialize(
        object.LOCATION_MAX_AGE_MIN,
        specifiedType: const FullType(int),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminDiagnosticsMatching200ResponseEnv object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminDiagnosticsMatching200ResponseEnvBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'MATCH_RADIUS_M':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.MATCH_RADIUS_M = valueDes;
          break;
        case r'LOCATION_MAX_AGE_MIN':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.LOCATION_MAX_AGE_MIN = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminDiagnosticsMatching200ResponseEnv deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminDiagnosticsMatching200ResponseEnvBuilder();
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

