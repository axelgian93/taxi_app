//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_diagnostics_matching_test_request.g.dart';

/// AdminDiagnosticsMatchingTestRequest
///
/// Properties:
/// * [pickupLat] 
/// * [pickupLng] 
/// * [radiusM] 
/// * [maxAgeMin] 
@BuiltValue()
abstract class AdminDiagnosticsMatchingTestRequest implements Built<AdminDiagnosticsMatchingTestRequest, AdminDiagnosticsMatchingTestRequestBuilder> {
  @BuiltValueField(wireName: r'pickupLat')
  num get pickupLat;

  @BuiltValueField(wireName: r'pickupLng')
  num get pickupLng;

  @BuiltValueField(wireName: r'radiusM')
  num? get radiusM;

  @BuiltValueField(wireName: r'maxAgeMin')
  num? get maxAgeMin;

  AdminDiagnosticsMatchingTestRequest._();

  factory AdminDiagnosticsMatchingTestRequest([void updates(AdminDiagnosticsMatchingTestRequestBuilder b)]) = _$AdminDiagnosticsMatchingTestRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminDiagnosticsMatchingTestRequestBuilder b) => b
      ..radiusM = 5000
      ..maxAgeMin = 10;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminDiagnosticsMatchingTestRequest> get serializer => _$AdminDiagnosticsMatchingTestRequestSerializer();
}

class _$AdminDiagnosticsMatchingTestRequestSerializer implements PrimitiveSerializer<AdminDiagnosticsMatchingTestRequest> {
  @override
  final Iterable<Type> types = const [AdminDiagnosticsMatchingTestRequest, _$AdminDiagnosticsMatchingTestRequest];

  @override
  final String wireName = r'AdminDiagnosticsMatchingTestRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminDiagnosticsMatchingTestRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'pickupLat';
    yield serializers.serialize(
      object.pickupLat,
      specifiedType: const FullType(num),
    );
    yield r'pickupLng';
    yield serializers.serialize(
      object.pickupLng,
      specifiedType: const FullType(num),
    );
    if (object.radiusM != null) {
      yield r'radiusM';
      yield serializers.serialize(
        object.radiusM,
        specifiedType: const FullType(num),
      );
    }
    if (object.maxAgeMin != null) {
      yield r'maxAgeMin';
      yield serializers.serialize(
        object.maxAgeMin,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminDiagnosticsMatchingTestRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminDiagnosticsMatchingTestRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'pickupLat':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.pickupLat = valueDes;
          break;
        case r'pickupLng':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.pickupLng = valueDes;
          break;
        case r'radiusM':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.radiusM = valueDes;
          break;
        case r'maxAgeMin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.maxAgeMin = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminDiagnosticsMatchingTestRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminDiagnosticsMatchingTestRequestBuilder();
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

