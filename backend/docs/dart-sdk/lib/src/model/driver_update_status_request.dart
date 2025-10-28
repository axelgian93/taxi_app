//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_update_status_request.g.dart';

/// DriverUpdateStatusRequest
///
/// Properties:
/// * [lat] 
/// * [lng] 
/// * [status] 
@BuiltValue()
abstract class DriverUpdateStatusRequest implements Built<DriverUpdateStatusRequest, DriverUpdateStatusRequestBuilder> {
  @BuiltValueField(wireName: r'lat')
  num? get lat;

  @BuiltValueField(wireName: r'lng')
  num? get lng;

  @BuiltValueField(wireName: r'status')
  DriverUpdateStatusRequestStatusEnum? get status;
  // enum statusEnum {  IDLE,  ASSIGNED,  ARRIVED,  ON_TRIP,  OFFLINE,  };

  DriverUpdateStatusRequest._();

  factory DriverUpdateStatusRequest([void updates(DriverUpdateStatusRequestBuilder b)]) = _$DriverUpdateStatusRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverUpdateStatusRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverUpdateStatusRequest> get serializer => _$DriverUpdateStatusRequestSerializer();
}

class _$DriverUpdateStatusRequestSerializer implements PrimitiveSerializer<DriverUpdateStatusRequest> {
  @override
  final Iterable<Type> types = const [DriverUpdateStatusRequest, _$DriverUpdateStatusRequest];

  @override
  final String wireName = r'DriverUpdateStatusRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverUpdateStatusRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.lat != null) {
      yield r'lat';
      yield serializers.serialize(
        object.lat,
        specifiedType: const FullType(num),
      );
    }
    if (object.lng != null) {
      yield r'lng';
      yield serializers.serialize(
        object.lng,
        specifiedType: const FullType(num),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(DriverUpdateStatusRequestStatusEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriverUpdateStatusRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverUpdateStatusRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'lat':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.lat = valueDes;
          break;
        case r'lng':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.lng = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DriverUpdateStatusRequestStatusEnum),
          ) as DriverUpdateStatusRequestStatusEnum;
          result.status = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  DriverUpdateStatusRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverUpdateStatusRequestBuilder();
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

class DriverUpdateStatusRequestStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'IDLE')
  static const DriverUpdateStatusRequestStatusEnum IDLE = _$driverUpdateStatusRequestStatusEnum_IDLE;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const DriverUpdateStatusRequestStatusEnum ASSIGNED = _$driverUpdateStatusRequestStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const DriverUpdateStatusRequestStatusEnum ARRIVED = _$driverUpdateStatusRequestStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'ON_TRIP')
  static const DriverUpdateStatusRequestStatusEnum ON_TRIP = _$driverUpdateStatusRequestStatusEnum_ON_TRIP;
  @BuiltValueEnumConst(wireName: r'OFFLINE')
  static const DriverUpdateStatusRequestStatusEnum OFFLINE = _$driverUpdateStatusRequestStatusEnum_OFFLINE;

  static Serializer<DriverUpdateStatusRequestStatusEnum> get serializer => _$driverUpdateStatusRequestStatusEnumSerializer;

  const DriverUpdateStatusRequestStatusEnum._(String name): super(name);

  static BuiltSet<DriverUpdateStatusRequestStatusEnum> get values => _$driverUpdateStatusRequestStatusEnumValues;
  static DriverUpdateStatusRequestStatusEnum valueOf(String name) => _$driverUpdateStatusRequestStatusEnumValueOf(name);
}

