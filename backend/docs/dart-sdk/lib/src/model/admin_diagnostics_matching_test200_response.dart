//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_diagnostics_matching_test200_response.g.dart';

/// AdminDiagnosticsMatchingTest200Response
///
/// Properties:
/// * [postgisAvailable] 
/// * [modeUsed] 
/// * [driverId] 
/// * [meters] 
/// * [candidatesChecked] 
@BuiltValue()
abstract class AdminDiagnosticsMatchingTest200Response implements Built<AdminDiagnosticsMatchingTest200Response, AdminDiagnosticsMatchingTest200ResponseBuilder> {
  @BuiltValueField(wireName: r'postgisAvailable')
  bool? get postgisAvailable;

  @BuiltValueField(wireName: r'modeUsed')
  AdminDiagnosticsMatchingTest200ResponseModeUsedEnum? get modeUsed;
  // enum modeUsedEnum {  POSTGIS,  HAVERSINE,  IDLE,  };

  @BuiltValueField(wireName: r'driverId')
  String? get driverId;

  @BuiltValueField(wireName: r'meters')
  num? get meters;

  @BuiltValueField(wireName: r'candidatesChecked')
  num? get candidatesChecked;

  AdminDiagnosticsMatchingTest200Response._();

  factory AdminDiagnosticsMatchingTest200Response([void updates(AdminDiagnosticsMatchingTest200ResponseBuilder b)]) = _$AdminDiagnosticsMatchingTest200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminDiagnosticsMatchingTest200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminDiagnosticsMatchingTest200Response> get serializer => _$AdminDiagnosticsMatchingTest200ResponseSerializer();
}

class _$AdminDiagnosticsMatchingTest200ResponseSerializer implements PrimitiveSerializer<AdminDiagnosticsMatchingTest200Response> {
  @override
  final Iterable<Type> types = const [AdminDiagnosticsMatchingTest200Response, _$AdminDiagnosticsMatchingTest200Response];

  @override
  final String wireName = r'AdminDiagnosticsMatchingTest200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminDiagnosticsMatchingTest200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.postgisAvailable != null) {
      yield r'postgisAvailable';
      yield serializers.serialize(
        object.postgisAvailable,
        specifiedType: const FullType(bool),
      );
    }
    if (object.modeUsed != null) {
      yield r'modeUsed';
      yield serializers.serialize(
        object.modeUsed,
        specifiedType: const FullType(AdminDiagnosticsMatchingTest200ResponseModeUsedEnum),
      );
    }
    if (object.driverId != null) {
      yield r'driverId';
      yield serializers.serialize(
        object.driverId,
        specifiedType: const FullType.nullable(String),
      );
    }
    if (object.meters != null) {
      yield r'meters';
      yield serializers.serialize(
        object.meters,
        specifiedType: const FullType.nullable(num),
      );
    }
    if (object.candidatesChecked != null) {
      yield r'candidatesChecked';
      yield serializers.serialize(
        object.candidatesChecked,
        specifiedType: const FullType.nullable(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminDiagnosticsMatchingTest200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminDiagnosticsMatchingTest200ResponseBuilder result,
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
        case r'modeUsed':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AdminDiagnosticsMatchingTest200ResponseModeUsedEnum),
          ) as AdminDiagnosticsMatchingTest200ResponseModeUsedEnum;
          result.modeUsed = valueDes;
          break;
        case r'driverId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.driverId = valueDes;
          break;
        case r'meters':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.meters = valueDes;
          break;
        case r'candidatesChecked':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.candidatesChecked = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminDiagnosticsMatchingTest200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminDiagnosticsMatchingTest200ResponseBuilder();
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

class AdminDiagnosticsMatchingTest200ResponseModeUsedEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'POSTGIS')
  static const AdminDiagnosticsMatchingTest200ResponseModeUsedEnum POSTGIS = _$adminDiagnosticsMatchingTest200ResponseModeUsedEnum_POSTGIS;
  @BuiltValueEnumConst(wireName: r'HAVERSINE')
  static const AdminDiagnosticsMatchingTest200ResponseModeUsedEnum HAVERSINE = _$adminDiagnosticsMatchingTest200ResponseModeUsedEnum_HAVERSINE;
  @BuiltValueEnumConst(wireName: r'IDLE')
  static const AdminDiagnosticsMatchingTest200ResponseModeUsedEnum IDLE = _$adminDiagnosticsMatchingTest200ResponseModeUsedEnum_IDLE;

  static Serializer<AdminDiagnosticsMatchingTest200ResponseModeUsedEnum> get serializer => _$adminDiagnosticsMatchingTest200ResponseModeUsedEnumSerializer;

  const AdminDiagnosticsMatchingTest200ResponseModeUsedEnum._(String name): super(name);

  static BuiltSet<AdminDiagnosticsMatchingTest200ResponseModeUsedEnum> get values => _$adminDiagnosticsMatchingTest200ResponseModeUsedEnumValues;
  static AdminDiagnosticsMatchingTest200ResponseModeUsedEnum valueOf(String name) => _$adminDiagnosticsMatchingTest200ResponseModeUsedEnumValueOf(name);
}

