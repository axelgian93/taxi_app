//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_id_get200_response_trip.g.dart';

/// TripsIdGet200ResponseTrip
///
/// Properties:
/// * [id] 
/// * [status] 
/// * [riderId] 
/// * [driverId] 
/// * [requestedAt] 
/// * [acceptedAt] 
/// * [arrivedAt] 
/// * [startedAt] 
/// * [completedAt] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [distanceKm] 
/// * [durationMin] 
/// * [costUsd] 
/// * [currency] 
@BuiltValue()
abstract class TripsIdGet200ResponseTrip implements Built<TripsIdGet200ResponseTrip, TripsIdGet200ResponseTripBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'status')
  String? get status;

  @BuiltValueField(wireName: r'riderId')
  String? get riderId;

  @BuiltValueField(wireName: r'driverId')
  String? get driverId;

  @BuiltValueField(wireName: r'requestedAt')
  DateTime? get requestedAt;

  @BuiltValueField(wireName: r'acceptedAt')
  DateTime? get acceptedAt;

  @BuiltValueField(wireName: r'arrivedAt')
  DateTime? get arrivedAt;

  @BuiltValueField(wireName: r'startedAt')
  DateTime? get startedAt;

  @BuiltValueField(wireName: r'completedAt')
  DateTime? get completedAt;

  @BuiltValueField(wireName: r'pickupLat')
  num? get pickupLat;

  @BuiltValueField(wireName: r'pickupLng')
  num? get pickupLng;

  @BuiltValueField(wireName: r'dropoffLat')
  num? get dropoffLat;

  @BuiltValueField(wireName: r'dropoffLng')
  num? get dropoffLng;

  @BuiltValueField(wireName: r'distanceKm')
  num? get distanceKm;

  @BuiltValueField(wireName: r'durationMin')
  int? get durationMin;

  @BuiltValueField(wireName: r'costUsd')
  num? get costUsd;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  TripsIdGet200ResponseTrip._();

  factory TripsIdGet200ResponseTrip([void updates(TripsIdGet200ResponseTripBuilder b)]) = _$TripsIdGet200ResponseTrip;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsIdGet200ResponseTripBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsIdGet200ResponseTrip> get serializer => _$TripsIdGet200ResponseTripSerializer();
}

class _$TripsIdGet200ResponseTripSerializer implements PrimitiveSerializer<TripsIdGet200ResponseTrip> {
  @override
  final Iterable<Type> types = const [TripsIdGet200ResponseTrip, _$TripsIdGet200ResponseTrip];

  @override
  final String wireName = r'TripsIdGet200ResponseTrip';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsIdGet200ResponseTrip object, {
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
        specifiedType: const FullType(String),
      );
    }
    if (object.riderId != null) {
      yield r'riderId';
      yield serializers.serialize(
        object.riderId,
        specifiedType: const FullType(String),
      );
    }
    if (object.driverId != null) {
      yield r'driverId';
      yield serializers.serialize(
        object.driverId,
        specifiedType: const FullType(String),
      );
    }
    if (object.requestedAt != null) {
      yield r'requestedAt';
      yield serializers.serialize(
        object.requestedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.acceptedAt != null) {
      yield r'acceptedAt';
      yield serializers.serialize(
        object.acceptedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.arrivedAt != null) {
      yield r'arrivedAt';
      yield serializers.serialize(
        object.arrivedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.startedAt != null) {
      yield r'startedAt';
      yield serializers.serialize(
        object.startedAt,
        specifiedType: const FullType(DateTime),
      );
    }
    if (object.completedAt != null) {
      yield r'completedAt';
      yield serializers.serialize(
        object.completedAt,
        specifiedType: const FullType(DateTime),
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
    if (object.distanceKm != null) {
      yield r'distanceKm';
      yield serializers.serialize(
        object.distanceKm,
        specifiedType: const FullType(num),
      );
    }
    if (object.durationMin != null) {
      yield r'durationMin';
      yield serializers.serialize(
        object.durationMin,
        specifiedType: const FullType(int),
      );
    }
    if (object.costUsd != null) {
      yield r'costUsd';
      yield serializers.serialize(
        object.costUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsIdGet200ResponseTrip object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsIdGet200ResponseTripBuilder result,
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
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
          break;
        case r'riderId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.riderId = valueDes;
          break;
        case r'driverId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.driverId = valueDes;
          break;
        case r'requestedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.requestedAt = valueDes;
          break;
        case r'acceptedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.acceptedAt = valueDes;
          break;
        case r'arrivedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.arrivedAt = valueDes;
          break;
        case r'startedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.startedAt = valueDes;
          break;
        case r'completedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.completedAt = valueDes;
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
        case r'distanceKm':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.distanceKm = valueDes;
          break;
        case r'durationMin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.durationMin = valueDes;
          break;
        case r'costUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.costUsd = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
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
  TripsIdGet200ResponseTrip deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsIdGet200ResponseTripBuilder();
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

