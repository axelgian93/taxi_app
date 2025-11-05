//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_request.g.dart';

/// TripsRequestRequest
///
/// Properties:
/// * [city] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [pickupAddress] 
/// * [dropoffAddress] 
/// * [distanceKm] 
/// * [durationMin] 
/// * [preferredMethod] 
@BuiltValue()
abstract class TripsRequestRequest implements Built<TripsRequestRequest, TripsRequestRequestBuilder> {
  @BuiltValueField(wireName: r'city')
  String get city;

  @BuiltValueField(wireName: r'pickupLat')
  num get pickupLat;

  @BuiltValueField(wireName: r'pickupLng')
  num get pickupLng;

  @BuiltValueField(wireName: r'dropoffLat')
  num get dropoffLat;

  @BuiltValueField(wireName: r'dropoffLng')
  num get dropoffLng;

  @BuiltValueField(wireName: r'pickupAddress')
  String? get pickupAddress;

  @BuiltValueField(wireName: r'dropoffAddress')
  String? get dropoffAddress;

  @BuiltValueField(wireName: r'distanceKm')
  num get distanceKm;

  @BuiltValueField(wireName: r'durationMin')
  num get durationMin;

  @BuiltValueField(wireName: r'preferredMethod')
  TripsRequestRequestPreferredMethodEnum? get preferredMethod;
  // enum preferredMethodEnum {  CASH,  CARD,  };

  TripsRequestRequest._();

  factory TripsRequestRequest([void updates(TripsRequestRequestBuilder b)]) = _$TripsRequestRequest;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestRequestBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestRequest> get serializer => _$TripsRequestRequestSerializer();
}

class _$TripsRequestRequestSerializer implements PrimitiveSerializer<TripsRequestRequest> {
  @override
  final Iterable<Type> types = const [TripsRequestRequest, _$TripsRequestRequest];

  @override
  final String wireName = r'TripsRequestRequest';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'city';
    yield serializers.serialize(
      object.city,
      specifiedType: const FullType(String),
    );
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
    yield r'dropoffLat';
    yield serializers.serialize(
      object.dropoffLat,
      specifiedType: const FullType(num),
    );
    yield r'dropoffLng';
    yield serializers.serialize(
      object.dropoffLng,
      specifiedType: const FullType(num),
    );
    if (object.pickupAddress != null) {
      yield r'pickupAddress';
      yield serializers.serialize(
        object.pickupAddress,
        specifiedType: const FullType.nullable(String),
      );
    }
    if (object.dropoffAddress != null) {
      yield r'dropoffAddress';
      yield serializers.serialize(
        object.dropoffAddress,
        specifiedType: const FullType.nullable(String),
      );
    }
    yield r'distanceKm';
    yield serializers.serialize(
      object.distanceKm,
      specifiedType: const FullType(num),
    );
    yield r'durationMin';
    yield serializers.serialize(
      object.durationMin,
      specifiedType: const FullType(num),
    );
    if (object.preferredMethod != null) {
      yield r'preferredMethod';
      yield serializers.serialize(
        object.preferredMethod,
        specifiedType: const FullType.nullable(TripsRequestRequestPreferredMethodEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestRequest object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestRequestBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'city':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.city = valueDes;
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
        case r'pickupAddress':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.pickupAddress = valueDes;
          break;
        case r'dropoffAddress':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.dropoffAddress = valueDes;
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
            specifiedType: const FullType(num),
          ) as num;
          result.durationMin = valueDes;
          break;
        case r'preferredMethod':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(TripsRequestRequestPreferredMethodEnum),
          ) as TripsRequestRequestPreferredMethodEnum?;
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
  TripsRequestRequest deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestRequestBuilder();
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

class TripsRequestRequestPreferredMethodEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'CASH')
  static const TripsRequestRequestPreferredMethodEnum CASH = _$tripsRequestRequestPreferredMethodEnum_CASH;
  @BuiltValueEnumConst(wireName: r'CARD')
  static const TripsRequestRequestPreferredMethodEnum CARD = _$tripsRequestRequestPreferredMethodEnum_CARD;

  static Serializer<TripsRequestRequestPreferredMethodEnum> get serializer => _$tripsRequestRequestPreferredMethodEnumSerializer;

  const TripsRequestRequestPreferredMethodEnum._(String name): super(name);

  static BuiltSet<TripsRequestRequestPreferredMethodEnum> get values => _$tripsRequestRequestPreferredMethodEnumValues;
  static TripsRequestRequestPreferredMethodEnum valueOf(String name) => _$tripsRequestRequestPreferredMethodEnumValueOf(name);
}

