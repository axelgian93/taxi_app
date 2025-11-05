//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_my_trips_history200_response_items_inner.g.dart';

/// DriverMyTripsHistory200ResponseItemsInner
///
/// Properties:
/// * [id] 
/// * [status] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [requestedAt] 
/// * [completedAt] 
/// * [costUsd] 
/// * [currency] 
@BuiltValue()
abstract class DriverMyTripsHistory200ResponseItemsInner implements Built<DriverMyTripsHistory200ResponseItemsInner, DriverMyTripsHistory200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  DriverMyTripsHistory200ResponseItemsInnerStatusEnum? get status;
  // enum statusEnum {  COMPLETED,  CANCELED,  };

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

  @BuiltValueField(wireName: r'completedAt')
  DateTime? get completedAt;

  @BuiltValueField(wireName: r'costUsd')
  num? get costUsd;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  DriverMyTripsHistory200ResponseItemsInner._();

  factory DriverMyTripsHistory200ResponseItemsInner([void updates(DriverMyTripsHistory200ResponseItemsInnerBuilder b)]) = _$DriverMyTripsHistory200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverMyTripsHistory200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverMyTripsHistory200ResponseItemsInner> get serializer => _$DriverMyTripsHistory200ResponseItemsInnerSerializer();
}

class _$DriverMyTripsHistory200ResponseItemsInnerSerializer implements PrimitiveSerializer<DriverMyTripsHistory200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [DriverMyTripsHistory200ResponseItemsInner, _$DriverMyTripsHistory200ResponseItemsInner];

  @override
  final String wireName = r'DriverMyTripsHistory200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverMyTripsHistory200ResponseItemsInner object, {
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
        specifiedType: const FullType(DriverMyTripsHistory200ResponseItemsInnerStatusEnum),
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
    if (object.completedAt != null) {
      yield r'completedAt';
      yield serializers.serialize(
        object.completedAt,
        specifiedType: const FullType.nullable(DateTime),
      );
    }
    if (object.costUsd != null) {
      yield r'costUsd';
      yield serializers.serialize(
        object.costUsd,
        specifiedType: const FullType.nullable(num),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType.nullable(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriverMyTripsHistory200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverMyTripsHistory200ResponseItemsInnerBuilder result,
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
            specifiedType: const FullType(DriverMyTripsHistory200ResponseItemsInnerStatusEnum),
          ) as DriverMyTripsHistory200ResponseItemsInnerStatusEnum;
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
        case r'completedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(DateTime),
          ) as DateTime?;
          if (valueDes == null) continue;
          result.completedAt = valueDes;
          break;
        case r'costUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.costUsd = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.currency = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  DriverMyTripsHistory200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverMyTripsHistory200ResponseItemsInnerBuilder();
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

class DriverMyTripsHistory200ResponseItemsInnerStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'COMPLETED')
  static const DriverMyTripsHistory200ResponseItemsInnerStatusEnum COMPLETED = _$driverMyTripsHistory200ResponseItemsInnerStatusEnum_COMPLETED;
  @BuiltValueEnumConst(wireName: r'CANCELED')
  static const DriverMyTripsHistory200ResponseItemsInnerStatusEnum CANCELED = _$driverMyTripsHistory200ResponseItemsInnerStatusEnum_CANCELED;

  static Serializer<DriverMyTripsHistory200ResponseItemsInnerStatusEnum> get serializer => _$driverMyTripsHistory200ResponseItemsInnerStatusEnumSerializer;

  const DriverMyTripsHistory200ResponseItemsInnerStatusEnum._(String name): super(name);

  static BuiltSet<DriverMyTripsHistory200ResponseItemsInnerStatusEnum> get values => _$driverMyTripsHistory200ResponseItemsInnerStatusEnumValues;
  static DriverMyTripsHistory200ResponseItemsInnerStatusEnum valueOf(String name) => _$driverMyTripsHistory200ResponseItemsInnerStatusEnumValueOf(name);
}

