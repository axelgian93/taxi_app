//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'rider_my_trips200_response_items_inner.g.dart';

/// RiderMyTrips200ResponseItemsInner
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
/// * [preferredMethod] 
@BuiltValue()
abstract class RiderMyTrips200ResponseItemsInner implements Built<RiderMyTrips200ResponseItemsInner, RiderMyTrips200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  RiderMyTrips200ResponseItemsInnerStatusEnum? get status;
  // enum statusEnum {  REQUESTED,  ASSIGNED,  ACCEPTED,  ARRIVED,  STARTED,  COMPLETED,  CANCELED,  };

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

  @BuiltValueField(wireName: r'preferredMethod')
  RiderMyTrips200ResponseItemsInnerPreferredMethodEnum? get preferredMethod;
  // enum preferredMethodEnum {  CASH,  CARD,  };

  RiderMyTrips200ResponseItemsInner._();

  factory RiderMyTrips200ResponseItemsInner([void updates(RiderMyTrips200ResponseItemsInnerBuilder b)]) = _$RiderMyTrips200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RiderMyTrips200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RiderMyTrips200ResponseItemsInner> get serializer => _$RiderMyTrips200ResponseItemsInnerSerializer();
}

class _$RiderMyTrips200ResponseItemsInnerSerializer implements PrimitiveSerializer<RiderMyTrips200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [RiderMyTrips200ResponseItemsInner, _$RiderMyTrips200ResponseItemsInner];

  @override
  final String wireName = r'RiderMyTrips200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RiderMyTrips200ResponseItemsInner object, {
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
        specifiedType: const FullType(RiderMyTrips200ResponseItemsInnerStatusEnum),
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
    if (object.preferredMethod != null) {
      yield r'preferredMethod';
      yield serializers.serialize(
        object.preferredMethod,
        specifiedType: const FullType.nullable(RiderMyTrips200ResponseItemsInnerPreferredMethodEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    RiderMyTrips200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RiderMyTrips200ResponseItemsInnerBuilder result,
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
            specifiedType: const FullType(RiderMyTrips200ResponseItemsInnerStatusEnum),
          ) as RiderMyTrips200ResponseItemsInnerStatusEnum;
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
        case r'preferredMethod':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(RiderMyTrips200ResponseItemsInnerPreferredMethodEnum),
          ) as RiderMyTrips200ResponseItemsInnerPreferredMethodEnum?;
          if (valueDes == null) continue;
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
  RiderMyTrips200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RiderMyTrips200ResponseItemsInnerBuilder();
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

class RiderMyTrips200ResponseItemsInnerStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'REQUESTED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum REQUESTED = _$riderMyTrips200ResponseItemsInnerStatusEnum_REQUESTED;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum ASSIGNED = _$riderMyTrips200ResponseItemsInnerStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum ACCEPTED = _$riderMyTrips200ResponseItemsInnerStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum ARRIVED = _$riderMyTrips200ResponseItemsInnerStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'STARTED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum STARTED = _$riderMyTrips200ResponseItemsInnerStatusEnum_STARTED;
  @BuiltValueEnumConst(wireName: r'COMPLETED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum COMPLETED = _$riderMyTrips200ResponseItemsInnerStatusEnum_COMPLETED;
  @BuiltValueEnumConst(wireName: r'CANCELED')
  static const RiderMyTrips200ResponseItemsInnerStatusEnum CANCELED = _$riderMyTrips200ResponseItemsInnerStatusEnum_CANCELED;

  static Serializer<RiderMyTrips200ResponseItemsInnerStatusEnum> get serializer => _$riderMyTrips200ResponseItemsInnerStatusEnumSerializer;

  const RiderMyTrips200ResponseItemsInnerStatusEnum._(String name): super(name);

  static BuiltSet<RiderMyTrips200ResponseItemsInnerStatusEnum> get values => _$riderMyTrips200ResponseItemsInnerStatusEnumValues;
  static RiderMyTrips200ResponseItemsInnerStatusEnum valueOf(String name) => _$riderMyTrips200ResponseItemsInnerStatusEnumValueOf(name);
}

class RiderMyTrips200ResponseItemsInnerPreferredMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const RiderMyTrips200ResponseItemsInnerPreferredMethodEnum CASH = _$riderMyTrips200ResponseItemsInnerPreferredMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const RiderMyTrips200ResponseItemsInnerPreferredMethodEnum CARD = _$riderMyTrips200ResponseItemsInnerPreferredMethodEnum_CARD;

  static Serializer<RiderMyTrips200ResponseItemsInnerPreferredMethodEnum> get serializer => _$riderMyTrips200ResponseItemsInnerPreferredMethodEnumSerializer;

  const RiderMyTrips200ResponseItemsInnerPreferredMethodEnum._(String name): super(name);

  static BuiltSet<RiderMyTrips200ResponseItemsInnerPreferredMethodEnum> get values => _$riderMyTrips200ResponseItemsInnerPreferredMethodEnumValues;
  static RiderMyTrips200ResponseItemsInnerPreferredMethodEnum valueOf(String name) => _$riderMyTrips200ResponseItemsInnerPreferredMethodEnumValueOf(name);
}

