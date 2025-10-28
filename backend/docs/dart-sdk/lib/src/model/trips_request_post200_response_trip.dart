//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post200_response_trip.g.dart';

/// TripsRequestPost200ResponseTrip
///
/// Properties:
/// * [id] 
/// * [status] 
@BuiltValue()
abstract class TripsRequestPost200ResponseTrip implements Built<TripsRequestPost200ResponseTrip, TripsRequestPost200ResponseTripBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  TripsRequestPost200ResponseTripStatusEnum? get status;
  // enum statusEnum {  REQUESTED,  ASSIGNED,  ACCEPTED,  ARRIVED,  STARTED,  COMPLETED,  CANCELED,  };

  TripsRequestPost200ResponseTrip._();

  factory TripsRequestPost200ResponseTrip([void updates(TripsRequestPost200ResponseTripBuilder b)]) = _$TripsRequestPost200ResponseTrip;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPost200ResponseTripBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPost200ResponseTrip> get serializer => _$TripsRequestPost200ResponseTripSerializer();
}

class _$TripsRequestPost200ResponseTripSerializer implements PrimitiveSerializer<TripsRequestPost200ResponseTrip> {
  @override
  final Iterable<Type> types = const [TripsRequestPost200ResponseTrip, _$TripsRequestPost200ResponseTrip];

  @override
  final String wireName = r'TripsRequestPost200ResponseTrip';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPost200ResponseTrip object, {
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
        specifiedType: const FullType(TripsRequestPost200ResponseTripStatusEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPost200ResponseTrip object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPost200ResponseTripBuilder result,
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
            specifiedType: const FullType(TripsRequestPost200ResponseTripStatusEnum),
          ) as TripsRequestPost200ResponseTripStatusEnum;
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
  TripsRequestPost200ResponseTrip deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPost200ResponseTripBuilder();
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

class TripsRequestPost200ResponseTripStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'REQUESTED')
  static const TripsRequestPost200ResponseTripStatusEnum REQUESTED = _$tripsRequestPost200ResponseTripStatusEnum_REQUESTED;
  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const TripsRequestPost200ResponseTripStatusEnum ASSIGNED = _$tripsRequestPost200ResponseTripStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const TripsRequestPost200ResponseTripStatusEnum ACCEPTED = _$tripsRequestPost200ResponseTripStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const TripsRequestPost200ResponseTripStatusEnum ARRIVED = _$tripsRequestPost200ResponseTripStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'STARTED')
  static const TripsRequestPost200ResponseTripStatusEnum STARTED = _$tripsRequestPost200ResponseTripStatusEnum_STARTED;
  @BuiltValueEnumConst(wireName: r'COMPLETED')
  static const TripsRequestPost200ResponseTripStatusEnum COMPLETED = _$tripsRequestPost200ResponseTripStatusEnum_COMPLETED;
  @BuiltValueEnumConst(wireName: r'CANCELED')
  static const TripsRequestPost200ResponseTripStatusEnum CANCELED = _$tripsRequestPost200ResponseTripStatusEnum_CANCELED;

  static Serializer<TripsRequestPost200ResponseTripStatusEnum> get serializer => _$tripsRequestPost200ResponseTripStatusEnumSerializer;

  const TripsRequestPost200ResponseTripStatusEnum._(String name): super(name);

  static BuiltSet<TripsRequestPost200ResponseTripStatusEnum> get values => _$tripsRequestPost200ResponseTripStatusEnumValues;
  static TripsRequestPost200ResponseTripStatusEnum valueOf(String name) => _$tripsRequestPost200ResponseTripStatusEnumValueOf(name);
}

