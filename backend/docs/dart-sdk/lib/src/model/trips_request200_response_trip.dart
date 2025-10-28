//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request200_response_trip.g.dart';

/// TripsRequest200ResponseTrip
///
/// Properties:
/// * [id] 
/// * [status] 
@BuiltValue()
abstract class TripsRequest200ResponseTrip implements Built<TripsRequest200ResponseTrip, TripsRequest200ResponseTripBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  TripsRequest200ResponseTripStatusEnum? get status;
  // enum statusEnum {  ASSIGNED,  ACCEPTED,  ARRIVED,  ONGOING,  COMPLETED,  CANCELED,  };

  TripsRequest200ResponseTrip._();

  factory TripsRequest200ResponseTrip([void updates(TripsRequest200ResponseTripBuilder b)]) = _$TripsRequest200ResponseTrip;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequest200ResponseTripBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequest200ResponseTrip> get serializer => _$TripsRequest200ResponseTripSerializer();
}

class _$TripsRequest200ResponseTripSerializer implements PrimitiveSerializer<TripsRequest200ResponseTrip> {
  @override
  final Iterable<Type> types = const [TripsRequest200ResponseTrip, _$TripsRequest200ResponseTrip];

  @override
  final String wireName = r'TripsRequest200ResponseTrip';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequest200ResponseTrip object, {
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
        specifiedType: const FullType(TripsRequest200ResponseTripStatusEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequest200ResponseTrip object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequest200ResponseTripBuilder result,
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
            specifiedType: const FullType(TripsRequest200ResponseTripStatusEnum),
          ) as TripsRequest200ResponseTripStatusEnum;
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
  TripsRequest200ResponseTrip deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequest200ResponseTripBuilder();
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

class TripsRequest200ResponseTripStatusEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ASSIGNED')
  static const TripsRequest200ResponseTripStatusEnum ASSIGNED = _$tripsRequest200ResponseTripStatusEnum_ASSIGNED;
  @BuiltValueEnumConst(wireName: r'ACCEPTED')
  static const TripsRequest200ResponseTripStatusEnum ACCEPTED = _$tripsRequest200ResponseTripStatusEnum_ACCEPTED;
  @BuiltValueEnumConst(wireName: r'ARRIVED')
  static const TripsRequest200ResponseTripStatusEnum ARRIVED = _$tripsRequest200ResponseTripStatusEnum_ARRIVED;
  @BuiltValueEnumConst(wireName: r'ONGOING')
  static const TripsRequest200ResponseTripStatusEnum ONGOING = _$tripsRequest200ResponseTripStatusEnum_ONGOING;
  @BuiltValueEnumConst(wireName: r'COMPLETED')
  static const TripsRequest200ResponseTripStatusEnum COMPLETED = _$tripsRequest200ResponseTripStatusEnum_COMPLETED;
  @BuiltValueEnumConst(wireName: r'CANCELED')
  static const TripsRequest200ResponseTripStatusEnum CANCELED = _$tripsRequest200ResponseTripStatusEnum_CANCELED;

  static Serializer<TripsRequest200ResponseTripStatusEnum> get serializer => _$tripsRequest200ResponseTripStatusEnumSerializer;

  const TripsRequest200ResponseTripStatusEnum._(String name): super(name);

  static BuiltSet<TripsRequest200ResponseTripStatusEnum> get values => _$tripsRequest200ResponseTripStatusEnumValues;
  static TripsRequest200ResponseTripStatusEnum valueOf(String name) => _$tripsRequest200ResponseTripStatusEnumValueOf(name);
}

