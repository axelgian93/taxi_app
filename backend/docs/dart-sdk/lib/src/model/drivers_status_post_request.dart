//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'drivers_status_post_request.g.dart';

/// DriversStatusPostRequest
///
/// Properties:
/// * [lat] 
/// * [lng] 
/// * [status] 
@BuiltValue()
abstract class DriversStatusPostRequest implements Built<DriversStatusPostRequest, DriversStatusPostRequestBuilder> {
  @BuiltValueField(wireName: r'lat')
  num? get lat;

  @BuiltValueField(wireName: r'lng')
  num? get lng;

  @BuiltValueField(wireName: r'status')
  DriversStatusPostRequestStatusEnum? get status;
  // enum statusEnum {  IDLE,  ASSIGNED,  ARRIVED,  ON_TRIP,  OFFLINE,  };

  DriversStatusPostRequest._();

  factory DriversStatusPostRequest([void updates(DriversStatusPostRequestBuilder b)]) = _$DriversStatusPostRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriversStatusPostRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriversStatusPostRequest> get serializer => _$DriversStatusPostRequestSerializer();
}

class _$DriversStatusPostRequestSerializer implements PrimitiveSerializer<DriversStatusPostRequest> {
  @override
  final Iterable<Type> types = const [DriversStatusPostRequest, _$DriversStatusPostRequest];

  @override
  final String wireName = r'DriversStatusPostRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriversStatusPostRequest object, {
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
        specifiedType: const FullType(DriversStatusPostRequestStatusEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriversStatusPostRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriversStatusPostRequestBuilder result,
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
            specifiedType: const FullType(DriversStatusPostRequestStatusEnum),
          ) as DriversStatusPostRequestStatusEnum;
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
  DriversStatusPostRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriversStatusPostRequestBuilder();
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

class DriversStatusPostRequestStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'IDLE')
  static const DriversStatusPostRequestStatusEnum IDLE = _$driversStatusPostRequestStatusEnum_IDLE;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const DriversStatusPostRequestStatusEnum ASSIGNED = _$driversStatusPostRequestStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const DriversStatusPostRequestStatusEnum ARRIVED = _$driversStatusPostRequestStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'ON_TRIP')
  static const DriversStatusPostRequestStatusEnum ON_TRIP = _$driversStatusPostRequestStatusEnum_ON_TRIP;
  @BuiltValueEnumConst(wireName: r'OFFLINE')
  static const DriversStatusPostRequestStatusEnum OFFLINE = _$driversStatusPostRequestStatusEnum_OFFLINE;

  static Serializer<DriversStatusPostRequestStatusEnum> get serializer => _$driversStatusPostRequestStatusEnumSerializer;

  const DriversStatusPostRequestStatusEnum._(String name): super(name);

  static BuiltSet<DriversStatusPostRequestStatusEnum> get values => _$driversStatusPostRequestStatusEnumValues;
  static DriversStatusPostRequestStatusEnum valueOf(String name) => _$driversStatusPostRequestStatusEnumValueOf(name);
}

