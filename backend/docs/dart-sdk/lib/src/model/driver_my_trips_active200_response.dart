//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_active200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'driver_my_trips_active200_response.g.dart';

/// DriverMyTripsActive200Response
///
/// Properties:
/// * [items] 
@BuiltValue()
abstract class DriverMyTripsActive200Response implements Built<DriverMyTripsActive200Response, DriverMyTripsActive200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<DriverMyTripsActive200ResponseItemsInner>? get items;

  DriverMyTripsActive200Response._();

  factory DriverMyTripsActive200Response([void updates(DriverMyTripsActive200ResponseBuilder b)]) = _$DriverMyTripsActive200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(DriverMyTripsActive200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<DriverMyTripsActive200Response> get serializer => _$DriverMyTripsActive200ResponseSerializer();
}

class _$DriverMyTripsActive200ResponseSerializer implements PrimitiveSerializer<DriverMyTripsActive200Response> {
  @override
  final Iterable<Type> types = const [DriverMyTripsActive200Response, _$DriverMyTripsActive200Response];

  @override
  final String wireName = r'DriverMyTripsActive200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    DriverMyTripsActive200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(DriverMyTripsActive200ResponseItemsInner)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    DriverMyTripsActive200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required DriverMyTripsActive200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(DriverMyTripsActive200ResponseItemsInner)]),
          ) as BuiltList<DriverMyTripsActive200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  DriverMyTripsActive200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = DriverMyTripsActive200ResponseBuilder();
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

