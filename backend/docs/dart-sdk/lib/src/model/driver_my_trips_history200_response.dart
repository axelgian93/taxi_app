//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/driver_my_trips_history200_response_items_inner.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_my_trips_history200_response.g.dart';

/// DriverMyTripsHistory200Response
///
/// Properties:
/// * [items] 
/// * [nextCursor] 
@BuiltValue()
abstract class DriverMyTripsHistory200Response implements Built<DriverMyTripsHistory200Response, DriverMyTripsHistory200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<DriverMyTripsHistory200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'nextCursor')
  String? get nextCursor;

  DriverMyTripsHistory200Response._();

  factory DriverMyTripsHistory200Response([void updates(DriverMyTripsHistory200ResponseBuilder b)]) = _$DriverMyTripsHistory200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverMyTripsHistory200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverMyTripsHistory200Response> get serializer => _$DriverMyTripsHistory200ResponseSerializer();
}

class _$DriverMyTripsHistory200ResponseSerializer implements PrimitiveSerializer<DriverMyTripsHistory200Response> {
  @override
  final Iterable<Type> types = const [DriverMyTripsHistory200Response, _$DriverMyTripsHistory200Response];

  @override
  final String wireName = r'DriverMyTripsHistory200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverMyTripsHistory200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(DriverMyTripsHistory200ResponseItemsInner)]),
      );
    }
    if (object.nextCursor != null) {
      yield r'nextCursor';
      yield serializers.serialize(
        object.nextCursor,
        specifiedType: const FullType.nullable(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriverMyTripsHistory200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverMyTripsHistory200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(DriverMyTripsHistory200ResponseItemsInner)]),
          ) as BuiltList<DriverMyTripsHistory200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        case r'nextCursor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.nextCursor = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  DriverMyTripsHistory200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverMyTripsHistory200ResponseBuilder();
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

