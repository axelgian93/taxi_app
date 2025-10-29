//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
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
  String? get status;

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
        specifiedType: const FullType(String),
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
            specifiedType: const FullType(String),
          ) as String;
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

