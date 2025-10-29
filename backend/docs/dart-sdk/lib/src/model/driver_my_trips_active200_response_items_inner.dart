//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_my_trips_active200_response_items_inner.g.dart';

/// DriverMyTripsActive200ResponseItemsInner
///
/// Properties:
/// * [id] 
/// * [status] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [requestedAt] 
/// * [preferredMethod] 
@BuiltValue()
abstract class DriverMyTripsActive200ResponseItemsInner implements Built<DriverMyTripsActive200ResponseItemsInner, DriverMyTripsActive200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  DriverMyTripsActive200ResponseItemsInnerStatusEnum? get status;
  // enum statusEnum {  ACCEPTED,  ARRIVED,  STARTED,  };

  @BuiltValueField(wireName: r'pickupLat')
  num? get pickupLat;

  @BuiltValueField(wireName: r'pickupLng')
  num? get pickupLng;

  @BuiltValueField(wireName: r'dropoffLat')
  num? get dropoffLat;

  @BuiltValueField(wireName: r'dropoffLng')
  num? get dropoffLng;

  @BuiltValueField(wireName: r'requestedAt')
  DateTime? get requestedAt;

  @BuiltValueField(wireName: r'preferredMethod')
  DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum? get preferredMethod;
  // enum preferredMethodEnum {  CASH,  CARD,  };

  DriverMyTripsActive200ResponseItemsInner._();

  factory DriverMyTripsActive200ResponseItemsInner([void updates(DriverMyTripsActive200ResponseItemsInnerBuilder b)]) = _$DriverMyTripsActive200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverMyTripsActive200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverMyTripsActive200ResponseItemsInner> get serializer => _$DriverMyTripsActive200ResponseItemsInnerSerializer();
}

class _$DriverMyTripsActive200ResponseItemsInnerSerializer implements PrimitiveSerializer<DriverMyTripsActive200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [DriverMyTripsActive200ResponseItemsInner, _$DriverMyTripsActive200ResponseItemsInner];

  @override
  final String wireName = r'DriverMyTripsActive200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverMyTripsActive200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.id != null) {
      yield r'id';
      yield serializers.serialize(
        object.id,
        specifiedType: const FullType(String),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(DriverMyTripsActive200ResponseItemsInnerStatusEnum),
      );
    }
    if (object.pickupLat != null) {
      yield r'pickupLat';
      yield serializers.serialize(
        object.pickupLat,
        specifiedType: const FullType(num),
      );
    }
    if (object.pickupLng != null) {
      yield r'pickupLng';
      yield serializers.serialize(
        object.pickupLng,
        specifiedType: const FullType(num),
      );
    }
    if (object.dropoffLat != null) {
      yield r'dropoffLat';
      yield serializers.serialize(
        object.dropoffLat,
        specifiedType: const FullType(num),
      );
    }
    if (object.dropoffLng != null) {
      yield r'dropoffLng';
      yield serializers.serialize(
        object.dropoffLng,
        specifiedType: const FullType(num),
      );
    }
    if (object.requestedAt != null) {
      yield r'requestedAt';
      yield serializers.serialize(
        object.requestedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.preferredMethod != null) {
      yield r'preferredMethod';
      yield serializers.serialize(
        object.preferredMethod,
        specifiedType: const FullType(DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriverMyTripsActive200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverMyTripsActive200ResponseItemsInnerBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DriverMyTripsActive200ResponseItemsInnerStatusEnum),
          ) as DriverMyTripsActive200ResponseItemsInnerStatusEnum;
          result.status = valueDes;
          break;
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
        case r'dropoffLat':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.dropoffLat = valueDes;
          break;
        case r'dropoffLng':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.dropoffLng = valueDes;
          break;
        case r'requestedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.requestedAt = valueDes;
          break;
        case r'preferredMethod':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum),
          ) as DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum;
          result.preferredMethod = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  DriverMyTripsActive200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverMyTripsActive200ResponseItemsInnerBuilder();
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

class DriverMyTripsActive200ResponseItemsInnerStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const DriverMyTripsActive200ResponseItemsInnerStatusEnum ACCEPTED = _$driverMyTripsActive200ResponseItemsInnerStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const DriverMyTripsActive200ResponseItemsInnerStatusEnum ARRIVED = _$driverMyTripsActive200ResponseItemsInnerStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'STARTED')
  static const DriverMyTripsActive200ResponseItemsInnerStatusEnum STARTED = _$driverMyTripsActive200ResponseItemsInnerStatusEnum_STARTED;

  static Serializer<DriverMyTripsActive200ResponseItemsInnerStatusEnum> get serializer => _$driverMyTripsActive200ResponseItemsInnerStatusEnumSerializer;

  const DriverMyTripsActive200ResponseItemsInnerStatusEnum._(String name): super(name);

  static BuiltSet<DriverMyTripsActive200ResponseItemsInnerStatusEnum> get values => _$driverMyTripsActive200ResponseItemsInnerStatusEnumValues;
  static DriverMyTripsActive200ResponseItemsInnerStatusEnum valueOf(String name) => _$driverMyTripsActive200ResponseItemsInnerStatusEnumValueOf(name);
}

class DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum CASH = _$driverMyTripsActive200ResponseItemsInnerPreferredMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum CARD = _$driverMyTripsActive200ResponseItemsInnerPreferredMethodEnum_CARD;

  static Serializer<DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum> get serializer => _$driverMyTripsActive200ResponseItemsInnerPreferredMethodEnumSerializer;

  const DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum._(String name): super(name);

  static BuiltSet<DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum> get values => _$driverMyTripsActive200ResponseItemsInnerPreferredMethodEnumValues;
  static DriverMyTripsActive200ResponseItemsInnerPreferredMethodEnum valueOf(String name) => _$driverMyTripsActive200ResponseItemsInnerPreferredMethodEnumValueOf(name);
}

