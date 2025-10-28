//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'trips_request_post_request_one_of.g.dart';

/// TripsRequestPostRequestOneOf
///
/// Properties:
/// * [city] 
/// * [pickupLat] 
/// * [pickupLng] 
/// * [dropoffLat] 
/// * [dropoffLng] 
/// * [distanceKm] 
/// * [durationMin] 
/// * [searchRadiusM] - Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).
/// * [locationMaxAgeMin] - Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).
@BuiltValue()
abstract class TripsRequestPostRequestOneOf implements Built<TripsRequestPostRequestOneOf, TripsRequestPostRequestOneOfBuilder> {
  @BuiltValueField(wireName: r'city')
  String? get city;

  @BuiltValueField(wireName: r'pickupLat')
  num get pickupLat;

  @BuiltValueField(wireName: r'pickupLng')
  num get pickupLng;

  @BuiltValueField(wireName: r'dropoffLat')
  num get dropoffLat;

  @BuiltValueField(wireName: r'dropoffLng')
  num get dropoffLng;

  @BuiltValueField(wireName: r'distanceKm')
  num? get distanceKm;

  @BuiltValueField(wireName: r'durationMin')
  int? get durationMin;

  /// Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).
  @BuiltValueField(wireName: r'searchRadiusM')
  int? get searchRadiusM;

  /// Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).
  @BuiltValueField(wireName: r'locationMaxAgeMin')
  int? get locationMaxAgeMin;

  TripsRequestPostRequestOneOf._();

  factory TripsRequestPostRequestOneOf([void updates(TripsRequestPostRequestOneOfBuilder b)]) = _$TripsRequestPostRequestOneOf;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(TripsRequestPostRequestOneOfBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<TripsRequestPostRequestOneOf> get serializer => _$TripsRequestPostRequestOneOfSerializer();
}

class _$TripsRequestPostRequestOneOfSerializer implements PrimitiveSerializer<TripsRequestPostRequestOneOf> {
  @override
  final Iterable<Type> types = const [TripsRequestPostRequestOneOf, _$TripsRequestPostRequestOneOf];

  @override
  final String wireName = r'TripsRequestPostRequestOneOf';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    TripsRequestPostRequestOneOf object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.city != null) {
      yield r'city';
      yield serializers.serialize(
        object.city,
        specifiedType: const FullType(String),
      );
    }
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
    if (object.searchRadiusM != null) {
      yield r'searchRadiusM';
      yield serializers.serialize(
        object.searchRadiusM,
        specifiedType: const FullType(int),
      );
    }
    if (object.locationMaxAgeMin != null) {
      yield r'locationMaxAgeMin';
      yield serializers.serialize(
        object.locationMaxAgeMin,
        specifiedType: const FullType(int),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    TripsRequestPostRequestOneOf object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required TripsRequestPostRequestOneOfBuilder result,
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
        case r'searchRadiusM':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.searchRadiusM = valueDes;
          break;
        case r'locationMaxAgeMin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.locationMaxAgeMin = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  TripsRequestPostRequestOneOf deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = TripsRequestPostRequestOneOfBuilder();
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

